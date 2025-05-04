import React, { useRef, useCallback, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
// import SpriteText from 'three-spritetext';
import { motion } from 'framer-motion';
import { useAppContext } from '../../help/ContextManager';
import Navbar from '../Navbar';
import QuerySideBar from '../QuerySideBar';
import DockerBar from '../DockerBar';
import ViewSetting from '../ViewSetting';
import BG from '../gfBG';
import createTreeDnode from '../../help/createTreeDnode';
import InfoBox from '../InfoBox/InfoBox';
import { nodeTooltipText, linkTooltipText } from '../../help/toolTipTexts';
import LinkQueryPanel from '../LinkQueryPanel';
import HistoryQuerySetting from '../HistoryQuerySetting';
const GraphDrawing = () => {
  const fgRef = useRef();

  const [isLinkCreationMode, setIsLinkCreationMode] = useState(false);
  const [isLinkPanelOpen, setIsLinkPanelOpen] = useState(false);

  const {
    selectedLink,
    setSelectedLink,
    cursorEvent,
    isComponentOpen,
    queryData,
    setComponentOpen,
    setQueryData,
    // queryHistory,
    setQueryHistory,
    // currentHistoryIndex,
    setCurrentHistoryIndex,
    graphSetting,
    setGraphSetting,
    drawingContextMenuOpen,
    setDrawingContextMenuOpen
  } = useAppContext();
  // const { graphData } = useAppContext();

  useEffect(() => {
    console.log('queryData', queryData);
  }, [queryData]);

  // useEffect(() => {
  //   console.log('queryHistory', queryHistory);
  //   console.log('currentHistoryIndex', currentHistoryIndex);
  // }, [queryHistory, currentHistoryIndex]);

  // const handleNodeHover = useCallback((node) => {
  //   const plusSign = document.querySelector('.plus-sign');
  //   if (node && plusSign) {
  //     plusSign.style.display = 'block';
  //     const { x, y } = fgRef.current.graph2ScreenCoords(node.x, node.y, node.z);
  //     plusSign.style.top = `${y + 10}px`;
  //     plusSign.style.left = `${x + 10}px`;
  //   } else if (plusSign) {
  //     plusSign.style.display = 'none';
  //   }
  // }, []);

  // const handleNodeClick = useCallback(
  //   (node, _) => {
  //     const fg = fgRef.current;

  //     if (selectedLink) {
  //       const { links, nodes } = queryData;
  //       const updatedLinks = links.map((link) => {
  //         if (link === selectedLink) {
  //           if (link.source === node.id) {
  //             // If the clicked node is the same as the source node, don't update the target
  //             return { ...link, selected: false };
  //           } else {
  //             // If the clicked node is different from the source node, update the target
  //             return { ...link, target: node.id, selected: false };
  //           }
  //         }
  //         return link;
  //       });
  //       setQueryData((prevData) => ({
  //         nodes: [...prevData.nodes],
  //         links: updatedLinks
  //       }));
  //       setQueryHistory((prevHistory) => [
  //         ...prevHistory.slice(0, currentHistoryIndex + 1),
  //         { nodes, links: updatedLinks }
  //       ]);
  //       setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  //       setSelectedLink(null);
  //     } else {
  //       const newlink = {
  //         source: node.id,
  //         target: {
  //           x: node.x + 20,
  //           y: node.y + 20,
  //           z: node.z + 20
  //         },
  //         color: 'red',
  //         __lineWidth: 1.5,
  //         __arrowLength: 10,
  //         __arrowRelPos: 1,
  //         __linkCurvature: 0,
  //         selected: true
  //       };
  //       setQueryData((prevData) => {
  //         const newQueryData = {
  //           nodes: [...prevData.nodes],
  //           links: [...prevData.links, newlink]
  //         };

  //         // Schedule the query history update with the updated data
  //         setQueryHistory((prevHistory) => [
  //           ...prevHistory,
  //           { nodes: newQueryData.nodes, links: newQueryData.links }
  //         ]);

  //         setCurrentHistoryIndex((prevIndex) => prevIndex + 1);

  //         setSelectedLink(newlink);

  //         // Return the new state for query data
  //         return newQueryData;
  //       });

  //       const distance = Math.hypot(
  //         node.x - fg.cameraPosition().x,
  //         node.y - fg.cameraPosition().y,
  //         node.z - fg.cameraPosition().z
  //       );

  //       const newCameraPos = {
  //         x: node.x,
  //         y: node.y,
  //         z: node.z + Math.min(distance, 500) // Limit the maximum distance to 500
  //       };
  //       fg.cameraPosition(newCameraPos, node, 2000);
  //     }
  //   },
  //   [fgRef, queryData]
  // );

  const generateUniqueId = () =>
    `Node-${new Date().getTime()}-${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    console.log('selectedLink', selectedLink);
  }, [selectedLink]);

  const handleNodeClick = useCallback(
    (node, _) => {
      if (isLinkCreationMode) {
        const { nodes, links } = queryData;
        const updatedLinks = links.map((link) => {
          if (link === selectedLink) {
            if (link.source === node.id) {
              // If the clicked node is the same as the source node, don't update the target
              return { ...link, selected: false };
            } else {
              // If the clicked node is different from the source node, update the target
              return {
                ...link,
                target: node.id,
                targetLabel: node.label,
                selected: false
              };
            }
          }
          return link;
        });

        setSelectedLink((prevLink) => ({
          ...prevLink,
          target: {
            ...prevLink.target,
            ...node
          },
          targetLabel: node.label
        }));

        setIsLinkPanelOpen(true);

        console.log('selectedLink', selectedLink);

        setQueryData((prevData) => ({
          nodes: [...prevData.nodes],
          links: updatedLinks
        }));

        setQueryHistory((prevHistory) => [
          ...prevHistory,
          { nodes, links: updatedLinks }
        ]);

        setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
        setComponentOpen((prevComponentOpen) => ({
          ...prevComponentOpen,
          QuerySideBar: false,
          ViewSetting: false,
          HistoryQuerySetting: false,
          DockerBarPosition: 'center',
          NavBar: 'visible'
        }));
      } else {
        const newLink = {
          id: generateUniqueId(),
          source: node.id,
          sourceLabel: node.label,
          target: {
            x: node.x + 20,
            y: node.y + 20,
            z: node.z + 20
          },
          color: 'red',
          __lineWidth: 1.5,
          __arrowLength: 10,
          __arrowRelPos: 0.8,
          __linkCurvature: 0.25,
          selected: true,
          attributes: {},
          targetLabel: ''
        };

        const { nodes, links } = queryData;
        setSelectedLink(newLink);
        setQueryData((prevData) => ({
          nodes,
          links: [...prevData.links, newLink]
        }));

        setQueryHistory((prevHistory) => [
          ...prevHistory,
          { nodes, links: [...links, newLink] }
        ]);

        setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
        setIsLinkCreationMode(true);
      }
    },
    [fgRef, queryData, selectedLink]
  );

  // const openLinkQueryPanel = (sourceNode) => {
  //   // const randomDistance = Math.floor(Math.random() * 100) + 20;
  //   const newLinkData = {
  //     source: sourceNode.id,
  //     target: {
  //       x: sourceNode.x + 20,
  //       y: sourceNode.y + 20,
  //       z: sourceNode.z + 20
  //     },
  //     color: 'red',
  //     __lineWidth: 1.5,
  //     __arrowLength: 10,
  //     __arrowRelPos: 1,
  //     __linkCurvature: 0,
  //     selected: true,
  //     attributes: {},
  //     sourceLabel: sourceNode.label
  //   };

  //   setSelectedLink(newLinkData);
  //   setIsLinkCreationMode(true);
  // };

  const handleLinkPanelCancel = () => {
    setIsLinkPanelOpen(false);
    setIsLinkCreationMode(false);
    setComponentOpen((prevComponentOpen) => ({
      ...prevComponentOpen,
      QuerySideBar: false,
      ViewSetting: false,
      HistoryQuerySetting: false,
      DockerBarPosition: 'center',
      NavBar: 'visible'
    }));
    setQueryData((prevData) => {
      console.log('prevData links', prevData.links);
      const updatedLinks = prevData.links.filter(
        (link) => link.id !== selectedLink.id
      );

      console.log('updatedLinks', updatedLinks);
      const newQueryData = {
        nodes: [...prevData.nodes],
        links: updatedLinks
      };
      setSelectedLink(null);

      return newQueryData;
    });
  };

  const handleLinkQuerySubmit = (updatedLink) => {
    const { links } = queryData;
    const { source, target, type, properties } = updatedLink;

    console.log('updatedLink in link query panel', updatedLink);

    // Check if a link of the same type already exists between the source and target nodes
    const existingLink = links.find(
      (link) =>
        link.source.id === source &&
        link.type === type &&
        link.target.id === target
    );

    if (existingLink) {
      console.log('A link of the same type already exists on this node');
      setQueryData((prevData) => {
        const updatedLinks = prevData.links.filter(
          (link) => link !== existingLink
        );
        const newQueryData = {
          nodes: [...prevData.nodes],
          links: updatedLinks
        };

        console.log('newQueryData after removing existingLink', newQueryData);

        setQueryHistory((prevHistory) => [
          ...prevHistory,
          { nodes: newQueryData.nodes, links: newQueryData.links }
        ]);

        setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
        setSelectedLink(null);

        setIsLinkPanelOpen(false);

        return newQueryData;
      });

      return;
    }

    setQueryData((prevData) => {
      const updatedLinks = prevData.links.map((link) => {
        if (link.id === updatedLink.id) {
          return {
            ...link,
            type,
            properties
          };
        }
        return link;
      });

      const newQueryData = {
        nodes: [...prevData.nodes],
        links: updatedLinks
      };

      console.log('newQueryData', newQueryData);

      setQueryHistory((prevHistory) => [
        ...prevHistory,
        { nodes: newQueryData.nodes, links: newQueryData.links }
      ]);

      setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
      setSelectedLink(updatedLink);

      setIsLinkPanelOpen(false);

      return newQueryData;
    });

    setIsLinkCreationMode(false);
  };

  const removeNode = (node) => {
    const { nodes, links } = queryData;
    const newLinks = links.filter(
      (l) => l.source !== node && l.target !== node
    );
    const newNodes = nodes.filter((n) => n !== node);
    setQueryData({ nodes: newNodes, links: newLinks });
    setQueryHistory((prevHistory) => [
      ...prevHistory,
      { nodes: newNodes, links: newLinks }
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const removeLink = (link) => {
    const { nodes, links } = queryData;
    const newLinks = links.filter((l) => l !== link);
    setQueryData((prevData) => ({
      nodes: [...prevData.nodes],
      links: newLinks
    }));
    setQueryHistory((prevHistory) => [
      ...prevHistory,
      { nodes, links: newLinks }
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <motion.div
      layout
      layoutId="newGraph"
      className={`flex bg-white  ${cursorEvent}`}
    >
      {drawingContextMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50"
        >
          <InfoBox
            x={700}
            y={700}
            onClose={() => setDrawingContextMenuOpen(false)}
            properties={{ name: 'test' }}
          />
        </motion.div>
      )}
      <Navbar />
      <div>
        {isComponentOpen.QuerySideBar && <QuerySideBar />}
        <div className="z-20  absolute w-[100%] h-[100%]">
          <div id="3d-graph">
            <ForceGraph3D
              ref={fgRef}
              graphData={queryData}
              backgroundColor={'#00000000'}
              nodeRelSize={graphSetting.nodeSize}
              linkWidth={(link) => link.__lineWidth || graphSetting.linkWidth}
              nodeLabel={nodeTooltipText}
              linkLabel={(link) => link.properties && linkTooltipText(link)}
              linkOpacity={graphSetting.linkOpacity}
              dagLevelDistance={graphSetting.linkLength}
              onNodeClick={handleNodeClick}
              onNodeRightClick={removeNode}
              nodeResolution={graphSetting.nodeResolution}
              nodeAutoColorBy={(node) => node.color}
              linkCurvature={(link) => link.__linkCurvature || 0.25}
              // config arrow
              linkDirectionalArrowLength={(link) => link.__arrowLength || 6}
              linkDirectionalArrowRelPos={1.2}
              linkThreeObjectExtend={true}
              nodeOpacity={graphSetting.nodeOpacity}
              // onNodeHover={handleNodeHover}
              // onNodeDragStart={handleNodeDrag}
              // onNodeDrag={handleNodeDrag}
              // onNodeDragEnd={handleNodeDragEnd}
              nodeThreeObject={(node) =>
                createTreeDnode(node, graphSetting, setGraphSetting)
              }
              onLinkRightClick={removeLink}
              // linkThreeObject={(link) => {
              //   // ${link.source.id} > ${link.target.id}
              //   const sprite = new SpriteText('');
              //   sprite.color = 'red';
              //   sprite.textHeight = 5;
              //   return sprite;
              // }}
              // linkPositionUpdate={(sprite, { start, end }) => {
              //   const middlePos = Object.assign(
              //     ...['x', 'y', 'z'].map((c) => ({
              //       [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
              //     }))
              //   );

              //   // Position sprite
              //   Object.assign(sprite.position, middlePos);
              // }}
            />
          </div>
          {isComponentOpen.DockerBar && <DockerBar />}
          {isComponentOpen.ViewSetting && <ViewSetting />}
          {isComponentOpen.HistoryQuerySetting && <HistoryQuerySetting />}
        </div>
      </div>
      <motion.div
        layoutId="BG"
        className="absolute w-[100vw] h-[100vh] invisible dark:visible"
      >
        <BG />
      </motion.div>
      {isLinkPanelOpen && (
        <LinkQueryPanel
          open={isLinkCreationMode}
          onClose={handleLinkPanelCancel}
          onSubmit={handleLinkQuerySubmit}
          specifiedLink={selectedLink}
        />
      )}
    </motion.div>
  );
};

export default GraphDrawing;
