/** @format */

// ContextManager.js
import React, { createContext, useState } from 'react';
import outDate from './data.json';

// Create a single context object that holds all the state and functions
const AppContext = createContext();

// Create a custom hook to access the context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// Create the AppContextProvider component
export const AppContextProvider = ({ children }) => {
  const [graphData, setGraphData] = useState(outDate);
  const [queryData, setQueryData] = useState({ nodes: [], links: [] });
  const [wholeGraphData, setWholeGraphData] = useState({
    nodes: [],
    links: [],
  });
  const [queryHistory, setQueryHistory] = useState([{ nodes: [], links: [] }]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [drawingContextMenuOpen, setDrawingContextMenuOpen] = useState(false);
  const [currentlyDragging, setCurrentlyDragging] = useState({
    nodeName: null,
    nodeColor: null,
  });
  const [graphSetting, setGraphSetting] = useState({
    GraphType: '3D',
    nodeSize: 9,
    nodeResolution: 28,
    nodeOpacity: 1,
    linkWidth: 1.5,
    linkResolution: 8,
    linkLength: 3,
    linkOpacity: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  });
  const [isComponentOpen, setComponentOpen] = useState({
    GlobalDarkMode: true,
    DockerBar: true,
    QuerySideBar: false,
    ViewSetting: false,
    NavBar: 'visible',
    DockerBarPosition: 'center',
  });
  const [cursorEvent, setCursorEvent] = useState({
    cursorEvent: null,
  });

  const [wholeLabelColorMapping, setWholeLabelColorMapping] = useState({});
  const [wholeLinkColorMapping, setWholeLinkColorMapping] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);

  // Create an object that holds all the state and functions
  const contextValue = {
    graphData,
    setGraphData,
    wholeGraphData,
    setWholeGraphData,
    queryData,
    setQueryData,
    queryHistory,
    setQueryHistory,
    currentHistoryIndex,
    setCurrentHistoryIndex,
    userInfo,
    setUserInfo,
    graphSetting,
    setGraphSetting,
    isComponentOpen,
    setComponentOpen,
    cursorEvent,
    setCursorEvent,
    selectedLink,
    setSelectedLink,
    currentlyDragging,
    setCurrentlyDragging,
    wholeLinkColorMapping,
    setWholeLinkColorMapping,
    wholeLabelColorMapping,
    setWholeLabelColorMapping,
    drawingContextMenuOpen,
    setDrawingContextMenuOpen,
    setDataLoaded,
    dataLoaded,
    isQuerying,
    setIsQuerying,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
