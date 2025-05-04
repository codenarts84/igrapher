/** @format */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../help/ContextManager';
import NodeQueryPanel from './NodeQueryPanel';
import ProgressBar from './Progress';
import { DrawingQuery } from '../help/APIs';
import { processNodes, processRelationships } from '../help/ProcessData';
// import HistoryQuerySetting from './HistoryQuerySetting';

const ball = 'ball.png';

// Docker
const Distance = (currentIndex, index) => {
  return Math.abs(currentIndex - index);
};

function DockerBar() {
  const {
    queryData,
    setQueryData,
    isComponentOpen,
    setComponentOpen,
    setCursorEvent,
    wholeLabelColorMapping,
    wholeLinkColorMapping,
    setSelectedLink,
    graphData,
    dataLoaded,
  } = useAppContext();
  const [labels, setlabels] = useState([]);
  const [isQueryPanelOpen, setIsQueryPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null); // The node that is ready to be added to the graph

  const openQueryPanel = (node) => {
    console.log('open query panel', node);
    setSelectedNode(node);
    setIsQueryPanelOpen(true);
    setComponentOpen((prevComponentOpen) => ({
      ...prevComponentOpen,
      QuerySideBar: false,
      ViewSetting: false,
      HistoryQuerySetting: false,
      DockerBarPosition: 'hide',
      NavBar: 'hide',
    }));
  };

  const closeQueryPanel = () => {
    setIsQueryPanelOpen(false);
    setComponentOpen((prevComponentOpen) => ({
      ...prevComponentOpen,
      QuerySideBar: false,
      ViewSetting: false,
      HistoryQuerySetting: false,
      DockerBarPosition: 'center',
      NavBar: 'visible',
    }));
  };

  const Tools = [
    {
      name: 'Query',
      img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDY3Ny41IDI0Mi40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NzcuNSAyNDIuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiAuc3Qwe2ZpbGw6IzIzMUYyMDt9IC5zdDF7ZmlsbDojMDE0MDYzO30gPC9zdHlsZT4gPGc+IDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMzcuOCw2MS45Yy0zNS4zLDAtNTguOSwyMC41LTU4LjksNjAuNHYyOC40YzMuNS0xLjcsNy4zLTIuNiwxMS40LTIuNnM4LDEsMTEuNSwyLjd2LTI4LjUgYzAtMjUuOCwxNC4yLTM5LjEsMzYtMzkuMXMzNiwxMy4zLDM2LDM5LjF2NjIuMWgyMi45di02Mi4xQzE5Ni43LDgyLjIsMTczLDYxLjksMTM3LjgsNjEuOUwxMzcuOCw2MS45eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjA5LjIsMTI0LjdjMC0zNi4yLDI2LjYtNjIuOCw2NC4yLTYyLjhzNjMuOCwyNi42LDYzLjgsNjIuOHY4LjVIMjMzLjNjMy40LDIxLjMsMTkuMywzMy4xLDQwLjEsMzMuMSBjMTUuNSwwLDI2LjMtNC44LDMzLjMtMTUuMmgyNS40Yy05LjIsMjIuMi0zMC45LDM2LjUtNTguNywzNi41QzIzNS43LDE4Ny41LDIwOS4yLDE2MSwyMDkuMiwxMjQuN0wyMDkuMiwxMjQuN3ogTTMxMywxMTIuNyBjLTQuNi0xOS4xLTIwLjMtMjkuNS0zOS42LTI5LjVzLTM0LjgsMTAuNi0zOS40LDI5LjVIMzEzeiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQ5LjUsMTI0LjdjMC0zNi4yLDI2LjYtNjIuOCw2NC4yLTYyLjhzNjQuMiwyNi42LDY0LjIsNjIuOGMwLDM2LjItMjYuNiw2Mi44LTY0LjIsNjIuOCBTMzQ5LjUsMTYxLDM0OS41LDEyNC43eiBNNDU0LjcsMTI0LjdjMC0yNC4yLTE2LjQtNDEuNS00MS4xLTQxLjVzLTQxLjEsMTcuNC00MS4xLDQxLjVjMCwyNC4xLDE2LjQsNDEuNSw0MS4xLDQxLjUgUzQ1NC43LDE0OC45LDQ1NC43LDEyNC43eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjA5LjEsMjA4LjFoMi43YzE0LjcsMCwyMC4zLTYuNSwyMC4zLTIzLjRWNjUuOUg2NTV2MTE3LjNjMCwyOS41LTExLjYsNDQuNy00MS4xLDQ0LjdoLTQuOEw2MDkuMSwyMDguMSBMNjA5LjEsMjA4LjF6Ij48L3BhdGg+IDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01OTcuNiwxOTUuOWgtMjIuOXYtMjguM2gtNTguMmMtMTEuNiwwLTIxLjctNS43LTI2LjMtMTQuOGMtNC4zLTguNi0zLjEtMTguNywzLjEtMjcuMkw1NDUuNiw1NyBjNy41LTEwLjEsMjAuMi0xNC4yLDMyLjItMTAuMmMxMiw0LDE5LjgsMTQuNywxOS44LDI3LjN2NzMuMWgxNy4ydjIwLjRoLTE3LjJWMTk1LjlMNTk3LjYsMTk1Ljl6IE01MTIuNiwxMzguMSBjLTAuNywwLjktMS4xLDIuMS0xLjEsMy40YzAsMy4yLDIuNiw1LjgsNS44LDUuOGg1Ny41VjczLjZjMC0zLjgtMi44LTUuMi00LTUuNmMtMC41LTAuMS0xLjItMC4zLTIuMS0wLjNjLTEuNCwwLTMuMSwwLjUtNC42LDIuNCBMNTEyLjYsMTM4LjFMNTEyLjYsMTM4LjFMNTEyLjYsMTM4LjF6Ij48L3BhdGg+IDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNC42LDEyNS44Yy0zLDEuNS01LjgsNC03LjgsNy4zYy0yLDMuMy0yLjgsNi44LTIuNSwxMC4zYzAuMyw2LjMsMy44LDEyLjEsOS41LDE1LjNjNS4zLDMsMTEuMywyLjMsMTcsMSBjNy0xLjgsMTMtMi41LDE5LjMsMS4zYzAsMCwwLDAsMC4zLDBjMTAuOCw2LjMsMTAuOCwyMi4xLDAsMjguNGMwLDAsMCwwLTAuMywwYy02LjMsMy44LTEyLjMsMy0xOS4zLDEuM2MtNS41LTEuNS0xMS41LTIuMy0xNywxIGMtNS44LDMuMy05LDkuMy05LjUsMTUuM2MtMC4zLDMuNSwwLjUsNywyLjUsMTAuM2MyLDMuMyw0LjUsNS44LDcuOCw3LjNjNS41LDIuOCwxMi4zLDIuOCwxOC0wLjVjNS4zLTMsNy44LTguOCw5LjMtMTQuMyBjMi03LDQuMy0xMi42LDEwLjgtMTYuMWM2LjMtMy44LDEyLjMtMywxOS4zLTEuM2M1LjUsMS41LDExLjUsMi4zLDE3LTFjNS44LTMuMyw5LTkuMyw5LjUtMTUuM2MwLTAuNSwwLTAuOCwwLTEuMyBjMC0wLjUsMC0wLjgsMC0xLjNjLTAuMy02LjMtMy44LTEyLjEtOS41LTE1LjNjLTUuMy0zLTExLjMtMi4zLTE3LTFjLTcsMS44LTEzLDIuNS0xOS4zLTEuM2MtNi4zLTMuOC04LjgtOS4xLTEwLjgtMTYuMSBjLTEuNS01LjUtNC0xMS4xLTkuMy0xNC4zQzM2LjgsMTIzLjEsMzAuMSwxMjMuMSwyNC42LDEyNS44eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjQzLjYsMTcuMmMtMTAuOCwwLTE5LjYsOC44LTE5LjYsMTkuNnM4LjgsMTkuNiwxOS42LDE5LjZjMTAuOCwwLDE5LjYtOC44LDE5LjYtMTkuNlM2NTQuNCwxNy4yLDY0My42LDE3LjJ6ICI+PC9wYXRoPiA8L2c+IDwvc3ZnPiA=',
      onClick: () => {
        setComponentOpen((prevComponentOpen) => ({
          ...prevComponentOpen,
          QuerySideBar: true,
          NavBar: 'hide',
          ViewSetting: false,
          HistoryQuerySetting: false,
          DockerBarPosition: 'right',
        }));
        setCurrentIndex(-99);
        setHasEntered(false);
      },
    },
    {
      name: 'Select',
      icon: 'fi fi-sr-interactive pt-[5px]',
      onClick: () => {
        // Add the desired functionality for Select tool
        console.log('Select tool clicked');
      },
    },
    {
      name: 'Scroll',
      icon: 'fi fi fi-sr-arrows pt-[5px]',
      onClick: () => {
        // Add the desired functionality for Scroll tool
        console.log('Scroll tool clicked');
      },
    },
    {
      name: 'Back',
      icon: 'fi fi-br-angle-left pt-[5px]',
      onClick: () => goBack(),
    },
    {
      name: 'Forward',
      icon: 'fi fi-br-angle-right pt-[5px]',
      onClick: () => goForward(),
    },
    {
      name: 'Delete',
      icon: 'fi fi-sr-trash pt-[5px]',
      onClick: () => {
        clearGraph();
      },
    },
    {
      name: 'Save',
      icon: 'fi fi-sr-disk pt-[5px]',
      onClick: () => {
        // Add the desired functionality for Save tool
        console.log('Save tool clicked');
      },
    },
    {
      name: 'Export',
      icon: 'fi fi-sr-file-export pt-[5px]',
      onClick: () => {
        // Add the desired functionality for Export tool
        console.log('Export tool clicked');
      },
    },
  ];
  const addNewNode = (node) => {
    const { nodes, links } = queryData;
    console.log('node ready to add', node);
    let newNode;

    if (nodes.length === 0) {
      // If the graph is empty, set the first node's position to (0, 0, 0)
      newNode = {
        ...node,
        fx: 0,
        fy: 0,
        fz: 0,
      };
    } else {
      // Calculate the average position of existing nodes
      const avgX = nodes.reduce((sum, node) => sum + node.x, 0) / nodes.length;
      const avgY = nodes.reduce((sum, node) => sum + node.y, 0) / nodes.length;
      const avgZ = nodes.reduce((sum, node) => sum + node.z, 0) / nodes.length;

      const distance = 50;
      const angle = Math.random() * Math.PI * 2;
      newNode = {
        ...node,
        fx: avgX + Math.cos(angle) * distance,
        fy: avgY + Math.sin(angle) * distance,
        fz: avgZ + Math.random() * distance - distance / 2, // Add a random offset to z
      };
    }
    const newNodes = [...nodes, newNode];
    updateGraphData({ nodes: newNodes, links });
  };

  // const addNewNodesToGraph = (newNodes) => {
  //   const { nodes, links } = queryData;

  //   // Filter out the nodes that are already in the graph
  //   const filteredNewNodes = newNodes.filter(
  //     (newNode) => !nodes.some((existingNode) => existingNode.id === newNode.id)
  //   );

  //   if (nodes.length === 0 && newNodes.length === 1) {
  //     // If the graph is empty, set the first node's position to (0, 0, 0)
  //     filteredNewNodes[0] = {
  //       ...filteredNewNodes[0],
  //       fx: 0,
  //       fy: 0,
  //       fz: 0
  //     };
  //   } else {
  //     console.log('lenth of nodes are not 0');
  //     filteredNewNodes.forEach((node) => {
  //       const distance = 50;
  //       const angle = Math.random() * Math.PI * 2;
  //       // Calculate the average position of existing nodes
  //       const avgX =
  //         nodes.reduce((sum, node) => sum + node.x, 0) / nodes.length;
  //       const avgY =
  //         nodes.reduce((sum, node) => sum + node.y, 0) / nodes.length;
  //       const avgZ =
  //         nodes.reduce((sum, node) => sum + node.z, 0) / nodes.length;

  //       return {
  //         ...node,
  //         fx: avgX + Math.cos(angle) * distance,
  //         fy: avgY + Math.sin(angle) * distance,
  //         fz: avgZ + Math.random() * distance - distance / 2 // Add a random offset to z
  //       };
  //     });
  //   }
  //   const allNodes = [...nodes, ...filteredNewNodes];
  //   updateGraphData({ nodes: allNodes, links });
  // };

  // update the nodeLabels
  useEffect(() => {
    console.log('graph data', graphData);
    // const properties =
    //   graphData.newNodes && graphData.newNodes[0].properties
    //     ? Object.keys(graphData.newNodes[0].properties)
    //     : [];

    const fetchlabels = async () => {
      const mappedlabels = Object.entries(wholeLabelColorMapping).map(
        ([name, color]) => ({
          name,
          color,
        }),
      );
      setlabels(mappedlabels);
    };
    fetchlabels();
  }, [wholeLabelColorMapping]);

  const submitQuery = async () => {
    console.log('Entering into submitQuery');
    const requestData = {};

    queryData.nodes.forEach((node, nodeIndex) => {
      const nodeKey = `node${nodeIndex + 1}`;
      requestData[nodeKey] = {
        type: node.label,
        attribute: Object.entries(node.properties).reduce(
          (acc, [key, { value, condition }]) => ({
            ...acc,
            [key]: `${condition} ${value}`,
          }),
          {},
        ),
      };

      if (nodeIndex < queryData.nodes.length - 1) {
        const linkKey = `link${nodeIndex + 1}`;
        const link = queryData.links.find(
          (link) =>
            (link.source.id === node.id &&
              link.target.id === queryData.nodes[nodeIndex + 1].id) ||
            (link.target.id === node.id &&
              link.source.id === queryData.nodes[nodeIndex + 1].id),
        );

        console.log('Link connected to source node', link);

        if (link) {
          requestData[linkKey] = {
            type: link.type || '',
            attribute: Object.entries(link.properties || {}).reduce(
              (acc, [key, { value, condition }]) => ({
                ...acc,
                [key]: `${condition} ${value}`,
              }),
              {},
            ),
          };
        }
      }
    });

    console.log('Request Data:', requestData);

    const response = await DrawingQuery(requestData);
    console.log('Result:', response);

    const nodesResponse = Object.keys(response.nodes || {}).length
      ? processNodes(Object.entries(response.nodes), wholeLabelColorMapping)
      : [];

    const linksResponse = Object.keys(response.relationships || {}).length
      ? processRelationships(
          Object.entries(response.relationships),
          wholeLinkColorMapping,
        )
      : [];

    console.log('link response', linksResponse);
    setQueryData({ nodes: nodesResponse, links: linksResponse });
    setQueryHistory((prevHistory) => [
      ...prevHistory,
      { nodes: nodesResponse, links: linksResponse },
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const Current = [
    {
      name: 'Submit a query',
      Icon: 'fi fi-sr-picture',
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition duration-50 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M8 3a3 3 0 0 0-1 5.8v6.4a3 3 0 1 0 2 0V15c0-1.1.9-2 2-2h1a5 5 0 0 0 5-4.1 3 3 0 1 0-2.1-.1A3 3 0 0 1 12 11h-1a4 4 0 0 0-2 .5V8.8A3 3 0 0 0 8 3Z' />
        </svg>
      ),
      onClick: () => {
        submitQuery();
      },
    },
    {
      name: 'Whole Graph',
      Icon: 'fi fi-sr-picture',
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition duration-50 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth='2'
            d='M8.7 8.7c1.1-1 2.2-2 3.3-2.7m0 0c3.1-2 6-2.6 7.4-1.3 1.8 1.8 0 6.6-4 10.7-4.1 4-8.9 5.8-10.7 4C3.4 18 4 15.2 6 12m6-6C9 4 6 3.3 4.7 4.6c-1.8 1.8 0 6.6 4 10.7M12 6c1.2.7 2.3 1.7 3.4 2.7m2.7 3.4c2 3 2.6 6 1.3 7.3C18 20.7 15 20 12 18m2-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
          />
        </svg>
      ),
    },
    {
      name: 'New Graph',
      Icon: 'fi fi-sr-picture',
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition dark:text-white duration-50 group-hover:text-gray-900 dark:group-hover:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      ),
    },
    {
      name: 'History',
      svg: (
        <motion.svg
          className='w-10 h-10 text-gray-500 dark:text-white'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <circle cx='12' cy='12' r='10' />
          <polyline points='12 6 12 12 16 14' />
        </motion.svg>
      ),
      onClick: () => {
        setComponentOpen((prevComponentOpen) => ({
          ...prevComponentOpen,
          HistoryQuerySetting: true,
          ViewSetting: false,
          QuerySideBar: false,
          DockerBarPosition: 'left',
        }));
      },
    },
    {
      name: 'Setting',
      Icon: 'fi fi-sr-picture',
      svg: (
        <motion.div layout layoutId='SettingComponentCaptureAnimation'>
          <svg
            className='flex w-10 h-10 text-gray-500 transition dark:text-white duration-50 group-hover:text-gray-900 dark:group-hover:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 7h14M5 12h14M5 17h14'
            />
          </svg>
        </motion.div>
      ),
      onClick: () => {
        setComponentOpen((prevComponentOpen) => ({
          ...prevComponentOpen,
          ViewSetting: true,
          HistoryQuerySetting: false,
          QuerySideBar: false,
          NavBar: 'hide',
          DockerBarPosition: 'left',
        }));
      },
    },
  ];
  const generateUniqueId = () =>
    `Node-${new Date().getTime()}-${Math.random().toString(36).slice(2, 11)}`;

  const [currentIndex, setCurrentIndex] = useState(-99);
  const [hasEntered, setHasEntered] = useState(0);

  const { queryHistory, setQueryHistory } = useAppContext();

  const { currentHistoryIndex, setCurrentHistoryIndex } = useAppContext();
  const { currentlyDragging, setCurrentlyDragging } = useAppContext();

  const updateGraphData = (newGraphData) => {
    setQueryData(newGraphData);
    setQueryHistory((prevHistory) => [
      ...prevHistory.slice(0, currentHistoryIndex + 1),
      newGraphData,
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      const prevHistoryIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(prevHistoryIndex);
      setQueryData(queryHistory[prevHistoryIndex]);
      // Check if there was a selected link in the previous history state
      const prevLinks = queryHistory[prevHistoryIndex].links;
      const prevSelectedLink = prevLinks.find((link) => link.selected);
      setSelectedLink(prevSelectedLink || null);
    }
  };

  const goForward = () => {
    if (currentHistoryIndex < queryHistory.length - 1) {
      const nextHistoryIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(nextHistoryIndex);
      setQueryData(queryHistory[nextHistoryIndex]);
      // Check if there was a selected link in the next history state
      const nextLinks = queryHistory[nextHistoryIndex].links;
      const nextSelectedLink = nextLinks.find((link) => link.selected);
      setSelectedLink(nextSelectedLink || null);
    }
  };

  const clearGraph = () => {
    setQueryData({ nodes: [], links: [] });
    setQueryHistory((prevHistory) => [
      ...prevHistory.slice(0, currentHistoryIndex + 1),
      { nodes: [], links: [] },
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const handleSingleQuery = async (updateNode) => {
    addNewNode(updateNode);

    console.log('Query History:', queryHistory);
  };

  // ===== Animation Feature of DockerBar Component =====
  // === Please do not modify the following numbers without Xianzhe‘s permission ===

  const InitialOpacity = 1.5;
  const baseOpacity = 0.5;
  const OpacityFadeFeature = 0.2;
  const InitialMargin = 20;
  const MarginFadeFeature = 4;
  const baseMargin = 0;
  const InitialY = 45;
  const baseY = 0;
  const YFadeFeature = 15;
  const ScaleFadeFeature = 0.3;
  const BaseScale = 1;
  const InitialScale = 1.7;
  const AnimationDelay = 0.06;

  // === Animation Feature of DockerBar Component ===
  // === Please do not modify the following numbers without Xianzhe‘s permission ===

  const DockerButtonSize = 'w-[45px] h-[45px]';
  const DockerBar = (
    <AnimatePresence>
      {labels && (
        <motion.div
          layout
          onMouseEnter={() => setHasEntered(true)}
          onMouseLeave={() => {
            setCurrentIndex(-99);
            setHasEntered(false);
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1.2 } }}
          exit={{ y: 30, opacity: 0, transition: { duration: 0.3 } }}
          className={`flex  justify-center items-center fixed z-40  
        ${
          isComponentOpen.DockerBarPosition === 'left' &&
          ' left-[50px] right-[400px]  bottom-[45px] '
        }
        ${
          isComponentOpen.DockerBarPosition === 'center' &&
          ' left-0 right-0  bottom-[45px] '
        }
        ${
          isComponentOpen.DockerBarPosition === 'right' &&
          ' left-[400px] right-[50px]  bottom-[45px] '
        }
        ${
          isComponentOpen.DockerBarPosition === 'hide' &&
          'scale-0 left-0 right-0 -bottom-[70px]'
        }
        }   `}
        >
          {/* {console.log('rendered')} */}
          <motion.div
            layout
            transition={{ duration: 0.7 }}
            className={`${
              dataLoaded === true ? 'inline-flex' : 'flex w-[50%]'
            }  justify-center items-center ${
              hasEntered
                ? 'bg-white/95 dark:bg-gray-600/80'
                : 'bg-gray-50/70 dark:bg-gray-300/20 backdrop-blur-[5px]'
            }  
          border border-gray-100 dark:border-gray-700/10 rounded-[20px]  dark:border-gray-600 ${
            currentIndex === -99
              ? 'px-[7.5px] h-[70px] '
              : 'h-[80px]  px-[20px] rounded-full  '
          }`}
          >
            {dataLoaded === true && (
              <motion.div className='inline-flex items-center justify-center'>
                {/* Tools */}
                <AnimatePresence>
                  {Tools.map((tool, index) => {
                    return (
                      ((tool.name === 'Query' &&
                        isComponentOpen.QuerySideBar === false) ||
                        tool.name !== 'Query') && (
                        <motion.div
                          key={tool.name}
                          className='flex flex-col items-center justify-center transition-all duration-50'
                        >
                          <div
                            onMouseEnter={() => setCurrentIndex(index)}
                            className='p-[7.5px]'
                          >
                            <motion.div
                              onClick={tool.onClick}
                              whileTap={{
                                backgroundColor: 'rgba(100, 100, 100, 0.4)',
                                backdropFilter: 'blur(5px)',
                                transition: { duration: 0.3 },
                              }}
                              style={{
                                zIndex: currentIndex === index ? 50 : 10,
                                scale: Math.max(
                                  InitialScale -
                                    Distance(currentIndex, index) *
                                      ScaleFadeFeature,
                                  BaseScale,
                                ),
                                boxShadow:
                                  currentIndex === index
                                    ? '0px 0px 20px 0px rgba(0,0,0,0.1)'
                                    : '0px 0px 0px 0px rgba(0,0,0,0)',
                                y: -Math.max(
                                  InitialY -
                                    Distance(currentIndex, index) *
                                      YFadeFeature,
                                  baseY,
                                ),
                                margin: Math.max(
                                  InitialMargin -
                                    Distance(currentIndex, index) *
                                      MarginFadeFeature,
                                  baseMargin,
                                ),
                                opacity: Math.max(
                                  InitialOpacity -
                                    Distance(currentIndex, index) *
                                      OpacityFadeFeature,
                                  baseOpacity,
                                ),
                                animationDelay: ` ${
                                  hasEntered === 0
                                    ? `${index * AnimationDelay}s`
                                    : undefined
                                }`,
                              }}
                              className={`cursor-pointer ${
                                hasEntered === 0
                                  ? 'animate__animated animate__fadeInUp'
                                  : ''
                              } flex transition-all duration-50 justify-center items-center ${DockerButtonSize} ${
                                tool.name === 'Query'
                                  ? 'rounded-[10px] backdrop-blur-[5px]'
                                  : ` ${
                                      hasEntered
                                        ? 'bg-gray-900/10  dark:bg-gray-100/50'
                                        : 'bg-gray-900/10  dark:bg-gray-100/5'
                                    }  backdrop-blur-[5px] rounded-[10px] `
                              } `}
                            >
                              {tool.icon && (
                                <i
                                  className={`text-[20px] text-center text-gray-500 dark:text-white ${tool.icon}`}
                                ></i>
                              )}
                              {tool.img && (
                                <motion.div
                                  layoutId='Query'
                                  layout='position'
                                  className={`p-[7px] ${
                                    hasEntered
                                      ? 'bg-gray-900/10  dark:bg-gray-100/50'
                                      : 'bg-gray-900/10  dark:bg-gray-100/5'
                                  }  backdrop-blur-[5px]   w-full h-full  flex justify-center items-center rounded-[10px]`}
                                >
                                  <motion.img
                                    layoutId='QueryComponentCaptureAnimation'
                                    layout
                                    className='dark:invert'
                                    src={tool.img}
                                  ></motion.img>
                                </motion.div>
                              )}
                            </motion.div>
                          </div>

                          {currentIndex === index && (
                            <AnimatePresence>
                              <motion.div
                                layout
                                key={tool.name + '-label'}
                                initial={{ opacity: 0, y: -40, scale: 0 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  transition: { duration: 0.31 },
                                }}
                                exit={{
                                  opacity: 0,
                                  y: -15,
                                  scale: 0,
                                  transition: { duration: 0.3 },
                                }}
                                id={tool.name}
                                className='flex z-10 -mt-[53px] flex px-[7px] py-[2px] text-[12px] font-medium text-white bg-gray-900/60 rounded-full shadow-lg dark:bg-gray-700'
                              >
                                {tool.name}
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </motion.div>
                      )
                    );
                  })}
                </AnimatePresence>
                {/* division */}
                <motion.div
                  layout
                  onMouseEnter={() => setCurrentIndex(Tools.length + 1)}
                  style={{
                    zIndex: currentIndex === Tools.length + 1 ? 50 : 40,
                    scaleY: Math.max(
                      InitialScale -
                        Distance(currentIndex, Tools.length + 1) * InitialScale,
                      BaseScale,
                    ),
                    animationDelay: ` ${
                      hasEntered === 0
                        ? `${(Tools.length + 1) * AnimationDelay}s`
                        : undefined
                    }`,
                  }}
                  className={`${
                    hasEntered === 0
                      ? 'animate__animated animate__fadeInUp'
                      : ''
                  } w-[2px] h-[35px] border-[1px] dark:border-gray-500 border-gray-300 mx-[10px] transition-all duration-50`}
                ></motion.div>
                {/* Label */}
                {labels.map((label, index) => (
                  <motion.div
                    // layout
                    key={index + Tools.length}
                    onClick={() =>
                      openQueryPanel({
                        id: generateUniqueId(),
                        group: label.name,
                        color: label.color,
                      })
                    }
                    className='flex flex-col items-center justify-center transition-all duration-50'
                  >
                    <div
                      onMouseEnter={() => setCurrentIndex(index + Tools.length)}
                      className='p-[7.5px]'
                    >
                      <motion.div
                        draggable={false}
                        // initial={{ backgroundColor: "#f5f5f5"}}
                        // onClick={() => label.onClick()}
                        // whileTap={{
                        //   backgroundColor: 'rgba(100, 100, 100, 0.4)',
                        //   backdropFilter: 'blur(5px)',
                        //   transition: { duration: 0.3 }
                        // }}
                        // transition={{ duration: 0.9 }}
                        style={{
                          zIndex:
                            currentIndex === index + Tools.length ? 50 : 40,
                          scale: Math.max(
                            InitialScale -
                              Distance(currentIndex, index + Tools.length) *
                                ScaleFadeFeature,
                            BaseScale,
                          ),
                          boxShadow:
                            currentIndex === index + Tools.length
                              ? currentlyDragging &&
                                currentlyDragging.nodeName === label.name
                                ? ''
                                : '0px 0px 20px 0px rgba(0,0,0,0.1)'
                              : '0px 0px 0px 0px rgba(0,0,0,0)',
                          y: -Math.max(
                            InitialY -
                              Distance(currentIndex, index + Tools.length) *
                                YFadeFeature,
                            baseY,
                          ),
                          margin: Math.max(
                            InitialMargin -
                              Distance(currentIndex, index + Tools.length) *
                                MarginFadeFeature,
                            baseMargin,
                          ),
                          opacity: Math.max(
                            InitialOpacity -
                              Distance(currentIndex, index + Tools.length) *
                                OpacityFadeFeature,
                            baseOpacity,
                          ),
                          animationDelay: ` ${
                            hasEntered === 0
                              ? `${(index + Tools.length) * AnimationDelay}s`
                              : undefined
                          }`,
                        }}
                        className={`${
                          hasEntered === 0
                            ? 'animate__animated animate__fadeInUp'
                            : ''
                        } 
                  ${
                    hasEntered ? 'rounded-full' : ''
                  } bg-gray-900/10  dark:bg-gray-100/5 backdrop-blur-[5px] 
                   ${
                     currentIndex === index + Tools.length
                       ? `${label.color}/10   `
                       : 'bg-gray-900/10  dark:bg-gray-100/5 backdrop-blur-[5px]'
                   }   
                  flex transition-all duration-50 justify-center items-center ${DockerButtonSize}                  
                      backdrop-blur-lg rounded-[10px]`}
                      >
                        <motion.div
                          draggable={true}
                          dragTransition={{
                            min: 0,
                            max: 500,
                            bounceDamping: 12,
                          }}
                          onDragStart={(e) => {
                            // Set the drag data with a type and the item's identifier.
                            const dragData = {
                              name: label.name,
                              color: label.color,
                              id: generateUniqueId(),
                            };
                            e.dataTransfer.setData(
                              'application/json',
                              JSON.stringify(dragData),
                            );
                            e.dataTransfer.effectAllowed = 'move';
                            setCurrentlyDragging({
                              nodeName: label.name,
                              nodeColor: label.color,
                            });
                            setCursorEvent('cursor-grabbing');
                          }}
                          onDragEnd={(e) => {
                            setCurrentlyDragging(null);
                            console.log('drag end:', currentlyDragging);
                            setCurrentIndex(-99);
                            setHasEntered(false);
                            setCursorEvent('cursor-auto');
                          }}
                          whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                          style={{ backgroundColor: label.color }}
                          className={` ${
                            currentIndex === index + Tools.length
                              ? currentlyDragging &&
                                currentlyDragging.nodeName === label.name
                                ? 'rounded-full  blur-[5px] w-[20px] h-[20px] '
                                : 'w-[30px] h-[30px]'
                              : 'w-[20px] h-[20px]  '
                          } cursor-grab rounded-full text-gray-500 dark:text-white duration-300 transition-all `}
                        >
                          <motion.img
                            className={` rounded-full ${label.color}`}
                            src={ball}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                    {/* Label Tag */}
                    {currentIndex === +index + Tools.length && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -40, scale: 0 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.31 },
                          }}
                          exit={{
                            opacity: 0,
                            y: -15,
                            scale: 0,
                            transition: { duration: 0.3 },
                          }}
                          id={label.name}
                          className='  z-10 -mt-[53px] flex px-[7px] py-[2px] text-[12px] font-medium text-white  bg-gray-900/60 rounded-full shadow-sm   dark:bg-gray-700'
                        >
                          {label.name}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
                {/* division */}
                <motion.div
                  layout
                  onMouseEnter={() =>
                    setCurrentIndex(Tools.length + labels.length + 1)
                  }
                  style={{
                    zIndex:
                      currentIndex === Tools.length + labels.length + 1
                        ? 50
                        : 40,
                    scaleY: Math.max(
                      InitialScale -
                        Distance(
                          currentIndex,
                          Tools.length + labels.length + 1,
                        ) *
                          InitialScale,
                      BaseScale,
                    ),
                    animationDelay: ` ${
                      hasEntered === 0
                        ? `${
                            (Tools.length + labels.length + 1) * AnimationDelay
                          }s`
                        : undefined
                    }`,
                  }}
                  className={`${
                    hasEntered === 0
                      ? 'animate__animated animate__fadeInUp'
                      : ''
                  } duration-50 w-[2px] h-[35px] border-[1px] dark:border-gray-500 border-gray-300 mx-[10px] transition-all duration-50`}
                ></motion.div>
                {/* Current */}
                {/* layoutId="history-panel" */}
                <AnimatePresence>
                  {Current.map((CurrentTool, index) => {
                    return (
                      ((CurrentTool.name === 'History' &&
                        isComponentOpen.HistoryQuerySetting === false) ||
                        (CurrentTool.name === 'Setting' &&
                          isComponentOpen.ViewSetting === false) ||
                        (CurrentTool.name !== 'Setting' &&
                          CurrentTool.name !== 'History')) && (
                        <motion.div
                          key={CurrentTool.name}
                          className='flex flex-col items-center justify-center transition-all duration-50'
                        >
                          <div
                            onMouseEnter={() =>
                              setCurrentIndex(
                                Tools.length + labels.length + index,
                              )
                            }
                            className='p-[7.5px]'
                          >
                            <motion.div
                              onClick={CurrentTool.onClick}
                              whileTap={{
                                backgroundColor: 'rgba(100, 100, 100, 0.4)',
                                backdropFilter: 'blur(5px)',
                                transition: { duration: 0.3 },
                              }}
                              style={{
                                zIndex:
                                  currentIndex ===
                                  Tools.length + labels.length + index
                                    ? 50
                                    : 10,
                                scale: Math.max(
                                  InitialScale -
                                    Distance(
                                      currentIndex,
                                      Tools.length + labels.length + index,
                                    ) *
                                      ScaleFadeFeature,
                                  BaseScale,
                                ),
                                boxShadow:
                                  currentIndex ===
                                  Tools.length + labels.length + index
                                    ? '0px 0px 20px 0px rgba(0,0,0,0.1)'
                                    : '0px 0px 0px 0px rgba(0,0,0,0)',
                                y: -Math.max(
                                  InitialY -
                                    Distance(
                                      currentIndex,
                                      Tools.length + labels.length + index,
                                    ) *
                                      YFadeFeature,
                                  baseY,
                                ),
                                margin: Math.max(
                                  InitialMargin -
                                    Distance(
                                      currentIndex,
                                      Tools.length + labels.length + index,
                                    ) *
                                      MarginFadeFeature,
                                  baseMargin,
                                ),
                                opacity: Math.max(
                                  InitialOpacity -
                                    Distance(
                                      currentIndex,
                                      Tools.length + labels.length + index,
                                    ) *
                                      OpacityFadeFeature,
                                  baseOpacity,
                                ),
                                animationDelay: ` ${
                                  hasEntered === 0
                                    ? `${
                                        (Tools.length + labels.length + index) *
                                        AnimationDelay
                                      }s`
                                    : undefined
                                }`,
                              }}
                              className={`cursor-pointer ${
                                hasEntered === 0
                                  ? 'animate__animated animate__fadeInUp'
                                  : ''
                              } flex transition-all duration-50 justify-center items-center ${DockerButtonSize} 
                      ${
                        hasEntered
                          ? 'bg-gray-900/10  dark:bg-gray-100/50'
                          : 'bg-gray-900/10  dark:bg-gray-100/5'
                      }  backdrop-blur-[5px] rounded-[10px]`}
                            >
                              <motion.div
                                // layout={
                                //
                                //     ? 'position'
                                //     : undefined
                                // }
                                layoutId={
                                  CurrentTool.name === 'Setting'
                                    ? 'Setting'
                                    : CurrentTool.name === 'History'
                                    ? 'History'
                                    : undefined
                                }
                              >
                                {CurrentTool.svg}
                              </motion.div>
                            </motion.div>
                          </div>

                          {currentIndex ===
                            Tools.length + labels.length + index && (
                            <AnimatePresence>
                              <motion.div
                                layout
                                key={CurrentTool.name + '-label'}
                                initial={{ opacity: 0, y: -40, scale: 0 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  transition: { duration: 0.31 },
                                }}
                                exit={{
                                  opacity: 0,
                                  y: -15,
                                  scale: 0,
                                  transition: { duration: 0.3 },
                                }}
                                id={CurrentTool.name}
                                className='flex z-10 -mt-[53px] flex px-[7px] py-[2px] text-[12px] font-medium text-white bg-gray-900/60 rounded-full shadow-lg dark:bg-gray-700'
                              >
                                {CurrentTool.name}
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </motion.div>
                      )
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
            {dataLoaded === false && (
              <motion.div className='flex-col w-full justify-center items-center fixed bottom-6 px-[15px]'>
                <ProgressBar />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className=''>
      {DockerBar}
      {isQueryPanelOpen && (
        <NodeQueryPanel
          onClose={closeQueryPanel}
          onSubmit={handleSingleQuery}
          selectedNode={selectedNode}
        />
      )}
    </div>
  );
}

export default DockerBar;
