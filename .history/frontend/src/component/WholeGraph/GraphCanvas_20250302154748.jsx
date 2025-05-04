/** @format */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
// import SpriteText from 'three-spritetext';
import { nodeTooltipText, linkTooltipText } from '../../help/toolTipTexts';
import { useAppContext } from '../../help/ContextManager';
import { processNodes, processRelationships } from '../../help/ProcessData';

import { getWholeGraph } from '../../help/APIs';
import { mapColors } from '../../help/MapColors';
import InfoBox from '../InfoBox/InfoBox';

const GraphCanvas = () => {
  const fgRef = useRef();

  const {
    graphSetting,
    graphData,
    setGraphData,
    setWholeLabelColorMapping,
    setWholeLinkColorMapping,
    setDataLoaded,
    setWholeGraphData,
  } = useAppContext();

  const { cursorEvent } = useAppContext();
  // react strict mode will result in double rendering
  // so we need to use useRef to avoid this
  const firstRender = useRef(true);
  const [infoBox, setInfoBox] = useState({ visible: false, content: '' });
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log('drop event');
      const data = event.dataTransfer.getData('application/json');
      const label = JSON.parse(data);
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newNode = {
        id: Math.random().toString(36).substr(2, 9),
        x: (x - rect.width / 2) * 0.01,
        y: (y - rect.height / 2) * 0.01,
        z: 0,
        properties: {
          name: label.name,
        },
        color: label.color,
      };
      const newGraphData = {
        ...graphData,
        nodes: [...graphData.nodes, newNode],
      };
      setGraphData(newGraphData);
    },
    [graphData, setGraphData],
  );

  useEffect(() => {
    const fetchGraphData = async () => {
      console.log('start to fetch graph data');
      // const testData = await testToken();
      // console.log('testData:', testData);
      // const data = await getWholeGraph('graph/wholegraph');

      console.log('returned data', data);
      const newNodes = Object.entries(data.nodes);
      console.log('newNodes', newNodes);
      const newLinks = Object.entries(data.relationships);

      console.log('newLinks', newLinks);

      const uniqueLabels = Array.from(
        new Set(
          newNodes.map(([, nodeData]) => {
            return nodeData.labels[0];
          }),
        ),
      );

      const uniqueRelationships = Array.from(
        new Set(
          newLinks.map(([, linkData]) => {
            return linkData.type;
          }),
        ),
      );

      const labelColorMapping = mapColors(
        uniqueLabels,
        'label',
      ).labelColorMapping;
      const linkColorMapping = mapColors(
        uniqueRelationships,
        'link',
      ).linkColorMapping;
      setWholeLabelColorMapping(labelColorMapping);
      setWholeLinkColorMapping(linkColorMapping);
      setDataLoaded(true);
      delete data.relationships;
      data.nodes = processNodes(newNodes, labelColorMapping);
      data.links = processRelationships(newLinks, linkColorMapping);
      setGraphData(data);
      setWholeGraphData(data);
    };
    if (firstRender.current) {
      console.log('first render');
      fetchGraphData();
      firstRender.current = false;
    }
  }, []);

  const handleClick = useCallback(
    (node, _) => {
      const distance = 180;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      setInfoBox({
        visible: true,
        /*         content: `Node ID: ${node.id}\nNode Name: ${node.properties.name || 'N/A'}`, */
        properties: node.properties,
      });

      // fgRef means the ForceGraph3D instance
      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        3000, // ms transition duration
      );
    },
    // only re-run the effect if the node changes
    [fgRef],
  );

  const controlOnNodeDragEnd = (node) => {
    // fx, fy, fz are the fixed position of the node
    // if we set the fx, fy, fx, the node will not move
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  return (
    graphData.nodes &&
    graphData.links && (
      <div
        id='3d-graph'
        onDrop={handleDrop} // Listen for drop events on the graph canvas
        onDragOver={(e) => e.preventDefault()} // Necessary to allow onDrop to fire
        className={`${cursorEvent}  w-full h-full overflow-hidden`}
      >
        <div id='iframe-wrap'></div>
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          linkResolution={graphSetting.linkResolution}
          nodeAutoColorBy={(node) => node.color}
          backgroundColor={graphSetting.backgroundColor}
          nodeRelSize={graphSetting.nodeSize}
          linkWidth={graphSetting.linkWidth}
          nodeResolution={graphSetting.nodeResolution}
          nodeLabel={nodeTooltipText}
          linkOpacity={graphSetting.linkOpacity}
          linkLabel={linkTooltipText}
          linkAutoColorBy={(link) => link.color}
          dagLevelDistance={graphSetting.linkLength}
          // nodeThreeObject={(node) =>
          //   createTreeDnode(node, graphSetting, setGraphSetting)
          // }
          onNodeClick={handleClick}
          onNodeDragEnd={controlOnNodeDragEnd}
          linkThreeObjectExtend={true}
          nodeOpacity={graphSetting.nodeOpacity}
          linkDirectionalParticles={1}
          // linkThreeObject={(link) => {
          //   const sprite = new SpriteText('');
          //   sprite.color = 'lightgrey';
          //   sprite.textHeight = 5;
          //   return sprite;
          // }}
          // linkPositionUpdate={(sprite, { start, end }) => {
          //   const middlePos = Object.assign(
          //     ...['x', 'y', 'z'].map((c) => ({
          //       [c]: start[c] + (end[c] - start[c]) / 2
          //     }))
          //   );
          //   Object.assign(sprite.position, middlePos);
          // }}
        />
        {infoBox.visible && (
          <InfoBox
            content={infoBox.content}
            onClose={() => setInfoBox({ ...infoBox, visible: false })}
            properties={infoBox.properties}
          />
        )}
      </div>
    )
  );
};

export default GraphCanvas;
