/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../help/ContextManager';
import { GetALlNodesViaOneLabel, GetOneRelation } from '../help/APIs';
import Loading from './Loading';
import { getProperties } from '../help/ProcessData';

const processNodes = (originalNodes, wholeLabelColorMapping) => {
  const newNodes = Object.entries(originalNodes).map(([id, nodeData]) => ({
    id,
    label: nodeData.labels,
    properties: getProperties(nodeData.properties),
    color: wholeLabelColorMapping[nodeData.labels[0]] || '#000000',
  }));
  return newNodes;
};

const processRelationships = (originalLinks, wholeLinkColorMapping) => {
  const newLinks = Object.entries(originalLinks).map(([id, linkData]) => ({
    // continue the links that not contained in the nodes
    id,
    source: linkData.node_id[0],
    target: linkData.node_id[1],
    type: linkData.type,
    properties: linkData.properties,
    color: wholeLinkColorMapping[linkData.type] || '#000000',
  }));
  return newLinks;
};

const Headers = [
  {
    name: 'Labels',
    icon: 'fi fi-ss-circle mx-[10px] pt-[6px]',
  },
  {
    name: 'Relationships',
    icon: 'fi fi-br-arrow-up-right mx-[10px] pt-[6px]',
  },
  {
    name: 'You are querying for:',
    icon: 'fi fi-sr-eye mr-[5px] pt-[6px]',
  },
];
const Accordion = (props) => {
  Accordion.displayName = 'Accordion';
  const {
    isComponentOpen,
    // graphData,
    setGraphData,
    wholeLabelColorMapping,
    wholeLinkColorMapping,
    wholeGraphData,
    dataLoaded,
    isQuerying,
    setIsQuerying,
  } = useAppContext();
  // assume the graphData in beginning is the whole graph
  // copy the graphData to wholeGraphData
  // const wholeGraphData = JSON.parse(JSON.stringify(graphData));
  const firstLabelsAndLinks = useRef(true);
  // const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [WholeQuerying, setWholeQuerying] = useState(false);
  const [Labels, setLabels] = useState([]);
  const [Links, setLinks] = useState([]);
  // const DarkenColorSelector = isComponentOpen.GlobalDarkMode ? 'max' : 'min';
  const index = 0;
  const GlobalVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      height: 'auto',
      zIndex: 10,
    },
    collapsed: {
      opacity: 0,
      y: -70,
      scale: 0,
      height: 0,
      zIndex: -50,
    },
  };

  const accordionData = [
    {
      id: 1,
      title: 'Whole Graph',
      content: [
        'You can use Whole Graph Query Mode access any kind of Nodes and Relationship.',
        'Firstly, choose any node type or relationship tag you wish as below.',
        'Secondly, use your mouse pointer touch anyone node or anyone relationship get details in whole graph on the right.',
      ],
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            fillRule='evenodd'
            d='M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2Z'
            clipRule='evenodd'
          />
        </svg>
      ),

      component: {
        nodes: Labels,
        relationships: Links,
      },
    },
    {
      id: 2,
      title: 'Multiple Nodes',
      content: [
        'Firstly, choose at least two nodes.',
        'Secondly, click the any "Multiple Nodes" query button to get the Sub-graph you wish.',
      ],
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
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
      QueryButtons: [
        {
          title: '2.1',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.3',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.5',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.18',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.29',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
      ],
    },
    {
      id: 3,
      title: 'Single Node',
      content: [
        'Firstly, choose at least one node.',
        'Secondly, click the any "Single Node" query button to get the Sub-graph you wish.',
      ],
      svg: (
        <svg
          className='flex-shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M8 3a3 3 0 0 0-1 5.8v6.4a3 3 0 1 0 2 0V15c0-1.1.9-2 2-2h1a5 5 0 0 0 5-4.1 3 3 0 1 0-2.1-.1A3 3 0 0 1 12 11h-1a4 4 0 0 0-2 .5V8.8A3 3 0 0 0 8 3Z' />
        </svg>
      ),
      QueryButtons: [
        {
          title: '2.2',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.4',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.6',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.7',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.13',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
        {
          title: '2.24',
          content:
            'Secondly, click the any "Whole Graph" query button to get the whole graph.',
          icon: ' fi fi-ss-person-circle-question',
        },
      ],
    },
  ];
  const ColorDarkenValue = 50;
  const buttonStyle =
    'w-[50px] h-[50px] bg-gray-500/20 rounded-[10px] flex items-center justify-center justify-self-center ';
  const nodeTagStyle = `${
    isQuerying ? 'cursor-not-allowed' : ''
  } justify-self-center  pr-[11.5px] relative flex items-center justify-center border rounded-full w-full my-[10px] py-1 px-3  text-[10px] font-medium transition duration-75 `;
  const labelStyle = `${
    isQuerying ? 'cursor-not-allowed' : ''
  } justify-self-center flex items-center justify-center border rounded-full w-full my-[10px] py-1 px-3  text-[10px] font-medium text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`;
  const iconStyle = 'text-[20px] text-gray-800 dark:text-white';
  const NodesAndRelationshipHead =
    'animate__animated animate__zoomIn text-[13px] pt-[20px] bb-[10px] font-semibold text-gray-500 uppercase dark:dark:text-gray-400 transition-all';
  const [openSections, setOpenSections] = useState([accordionData[0].id]);

  // 默认全开
  // const [openSections, setOpenSections] = useState(
  //   accordionData.map((section) => section.id)
  // );
  const [currentWholeQuery, setCurrentWholeQuery] = useState({
    name: undefined,
    color: undefined,
    type: undefined,
  });

  // 一次只开一个
  const toggleAccordion = (index) => {
    setOpenSections((prevSections) => {
      if (prevSections.includes(index)) {
        return [];
      } else {
        return [index];
      }
    });
  };

  // 单独开合
  // const toggleAccordion = (index) => {
  //   setOpenSections((prevSections) =>
  //     prevSections.includes(index)
  //       ? prevSections.filter((item) => item !== index)
  //       : [...prevSections, index]
  //   );
  // };

  useEffect(() => {
    const fetchLabels = async () => {
      console.log('fetchLabels1', isQuerying);

      // click events for each label
      const mappedLabels = Object.entries(wholeLabelColorMapping).map(
        ([name, color]) => ({
          name,
          color,
          onClick: async () => {
            setIsQuerying(true); // 开始查询时设置为true
            // const data = await GetALlNodesViaOneLabel(name);
            const newNodes = data.nodes;
            // start to process DATA
            data.nodes = processNodes(newNodes, wholeLabelColorMapping);
            data.links = [];
            console.log(data);
            setGraphData(data);
            setIsQuerying(false);
          },
        }),
      );
      setLabels(mappedLabels);
      // console.log('fetchLabels2', isQuerying);
    };

    // click events for each link
    const fetchLinks = async () => {
      const mappedLinks = Object.entries(wholeLinkColorMapping).map(
        ([name, color]) => ({
          name,
          color,
          onClick: async () => {
            setIsQuerying(true);
            const data = await GetOneRelation(name);
            const newNodes = data.nodes;
            // start to process DATA
            data.nodes = processNodes(newNodes, wholeLabelColorMapping);
            data.links = processRelationships(
              data.relationships,
              wholeLinkColorMapping,
            );
            // console.log(data);
            setGraphData(data);
            setIsQuerying(false);
          },
        }),
      );
      setLinks(mappedLinks);
    };
    if (firstLabelsAndLinks.current) {
      firstLabelsAndLinks.current = false;
      fetchLabels();
      fetchLinks();
    }
  }, [wholeLabelColorMapping, wholeLinkColorMapping]);

  const handleCloseWholeQuery = () => {
    // console.log('handle close whole query');
    setGraphData(wholeGraphData);
  };
  const AccordionInside = (props) => (
    <motion.div>
      {accordionData.map((section) => (
        <motion.div key={section.id}>
          {/* Open Button */}
          <motion.button
            transition={{
              duration: 0.8,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            style={{ animationDelay: `${1 * index}s` }}
            onClick={() => toggleAccordion(section.id)}
            className='animate__animated animate__zoomIn flex w-[100%] h-[50px] mb-[20px]  z-50  justify-between items-center  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group hover:bg-white dark:hover:bg-gray-500/80 rounded-[7px]'
          >
            <div className='flex items-center'>
              {section.svg}

              <span className='flex-1 ms-3 whitespace-nowrap text-[18px] text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                {section.title}{' '}
                {!openSections.includes(section.id) && (
                  <motion.p className='animate__animated animate__zoomIn inline-flex items-center justify-center border rounded-full py-1 px-3 ms-3  text-[10px] font-medium text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'>
                    {section.QueryButtons
                      ? section.QueryButtons.length
                      : section.component.nodes.length +
                        section.component.relationships.length}
                  </motion.p>
                )}
              </span>
            </div>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='8 8 20 20'
              className={`${
                openSections.includes(section.id) ? 'rotate-90 ' : ''
              }  w-10 h-10 text-gray-500 transition duration-300 dark:fill-gray-400 group-hover:fill-gray-900 dark:group-hover:fill-white `}
            >
              <path d='M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z'></path>
            </svg>
          </motion.button>
          {/* Instruction */}
          <AnimatePresence>
            {props.isOpen && openSections.includes(section.id) && (
              <motion.div
                key={section.id + 'instruction'}
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={GlobalVariants}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                  delay: 0.06 * index,
                }}
                className='z-10'
              >
                {section.content.map((paragraph, index) => (
                  <motion.p
                    className='px-2 pb-[15px] text-[14px] text-gray-400 dark:text-gray-300'
                    key={index + paragraph[0] + 'paragraph'}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Query Button Group */}
          <AnimatePresence>
            {/* Gerneral button groups */}
            {openSections.includes(section.id) && section.QueryButtons && (
              <motion.div className='grid grid-cols-4'>
                {section.QueryButtons.map((button, index) => (
                  <motion.div
                    key={index + button.title + 'button'}
                    initial='collapsed'
                    animate='open'
                    exit='collapsed'
                    variants={GlobalVariants}
                    transition={{
                      duration: 0.8,
                      ease: [0.04, 0.62, 0.23, 0.98],
                      delay: 0.02 * index,
                    }}
                    className='flex items-center justify-center w-full h-auto'
                  >
                    <motion.div className='h-auto justify-self-center'>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className={buttonStyle}
                        onClick={button.onClick}
                      >
                        <i className={button.icon + ' ' + iconStyle}></i>
                      </motion.button>
                      <motion.div className={labelStyle}>
                        {button.title}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {/* Whole graph query component */}
            {openSections.includes(section.id) && section.component && (
              <motion.div
                key={
                  section.id +
                  'Whole graph query' +
                  section.component.nodes.name
                }
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={GlobalVariants}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                  delay: 0.06 * index,
                }}
                className=''
              >
                {/* Query Status */}
                <AnimatePresence key={'WholeQueryingStatus'}>
                  {WholeQuerying && (
                    <motion.div
                      layout
                      exit={{ scale: 0 }}
                      style={{
                        color: `rgba(${Math[
                          isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                        ](
                          parseInt(currentWholeQuery.color.slice(1, 3), 16) +
                            ColorDarkenValue,
                          parseInt(currentWholeQuery.color.slice(1, 3), 16) -
                            ColorDarkenValue,
                        )}, ${Math[
                          isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                        ](
                          parseInt(currentWholeQuery.color.slice(3, 5), 16) +
                            ColorDarkenValue,
                          parseInt(currentWholeQuery.color.slice(3, 5), 16) -
                            ColorDarkenValue,
                        )}, ${Math[
                          isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                        ](
                          parseInt(currentWholeQuery.color.slice(5, 7), 16) +
                            ColorDarkenValue,
                          parseInt(currentWholeQuery.color.slice(5, 7), 16) -
                            ColorDarkenValue,
                        )}, 1)`,
                      }}
                      className='animate__animated animate__zoomIn text-[13px] font-semibold text-gray-500 dark:dark:text-gray-400 transition-all'
                      key={index + 'WholeQueryingStatus'}
                    >
                      <i className={Headers[2].icon}></i>
                      {`${Headers[2].name}`}
                      {currentWholeQuery.type === 'Nodes' && (
                        <i className={Headers[0].icon}></i>
                      )}
                      {currentWholeQuery.type === 'Relationships' && (
                        <i className={Headers[1].icon}></i>
                      )}
                      {`All ${currentWholeQuery.type}`}
                    </motion.div>
                  )}
                  <motion.div
                    layout
                    className='flex justify-between items-center transition-all h-[50px]'
                  >
                    {WholeQuerying && (
                      <AnimatePresence>
                        {WholeQuerying && (
                          <motion.button
                            layout
                            disabled={isQuerying ? true : undefined}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.03 }}
                            key={index}
                            onClick={() => {
                              setIsQuerying(false);
                              setWholeQuerying(false);
                              setCurrentWholeQuery({
                                name: undefined,
                                color: undefined,
                                type: undefined,
                              });
                              setWholeQuerying(false);
                              handleCloseWholeQuery();
                            }}
                            className='flex items-center justify-center w-auto h-auto animate__animated animate__zoomIn '
                          >
                            <motion.div className='relative inline-flex items-center h-auto justify-self-center '>
                              <motion.div
                                style={{
                                  backgroundColor: `rgba(${parseInt(
                                    currentWholeQuery.color.slice(1, 3),
                                    16,
                                  )}, ${parseInt(
                                    currentWholeQuery.color.slice(3, 5),
                                    16,
                                  )}, ${parseInt(
                                    currentWholeQuery.color.slice(5, 7),
                                    16,
                                  )}, 0.15)`,
                                  borderColor: `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(1, 3),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(1, 3),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(3, 5),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(3, 5),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(5, 7),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(5, 7),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, 1)`,
                                  color: `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(1, 3),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(1, 3),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(3, 5),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(3, 5),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      currentWholeQuery.color.slice(5, 7),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      currentWholeQuery.color.slice(5, 7),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, 1)`,
                                }}
                                className='justify-self-center  pr-[11.5px] relative flex items-center justify-center border rounded-full w-full my-[10px] py-1 px-3  text-[10px] font-medium transition duration-75 '
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className=' z-0 rounded-full w-[10px] h-[10px] m-[3px] mr-[6px] items-center justify-center  transition-all duration-75'
                                  style={{
                                    backgroundColor: `rgba(${parseInt(
                                      currentWholeQuery.color.slice(1, 3),
                                      16,
                                    )}, ${parseInt(
                                      currentWholeQuery.color.slice(3, 5),
                                      16,
                                    )}, ${parseInt(
                                      currentWholeQuery.color.slice(5, 7),
                                      16,
                                    )}, 1)`,
                                  }}
                                >
                                  <img src='ball.png' alt='' />
                                </motion.div>
                                <div>{currentWholeQuery.name}</div>
                                <motion.div
                                  className='ml-[10px] h-10 flex justify-center items-center'
                                  key={index + 'closeWholeQuery'}
                                >
                                  <svg
                                    aria-hidden='true'
                                    className='w-7 h-7'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                  <span className='sr-only'>Close menu</span>
                                </motion.div>
                              </motion.div>
                            </motion.div>
                          </motion.button>
                        )}
                        {!isQuerying && (
                          <motion.div
                            layout
                            initial={{ scale: 0, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0, opacity: 0, y: -20 }}
                            className='flex items-center justify-center text-[15px]'
                            style={{
                              color: `rgba(${Math[
                                isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                              ](
                                parseInt(
                                  currentWholeQuery.color.slice(1, 3),
                                  16,
                                ) + ColorDarkenValue,
                                parseInt(
                                  currentWholeQuery.color.slice(1, 3),
                                  16,
                                ) - ColorDarkenValue,
                              )}, ${Math[
                                isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                              ](
                                parseInt(
                                  currentWholeQuery.color.slice(3, 5),
                                  16,
                                ) + ColorDarkenValue,
                                parseInt(
                                  currentWholeQuery.color.slice(3, 5),
                                  16,
                                ) - ColorDarkenValue,
                              )}, ${Math[
                                isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                              ](
                                parseInt(
                                  currentWholeQuery.color.slice(5, 7),
                                  16,
                                ) + ColorDarkenValue,
                                parseInt(
                                  currentWholeQuery.color.slice(5, 7),
                                  16,
                                ) - ColorDarkenValue,
                              )}, 1)`,
                            }}
                          >
                            <i className='fi fi-br-check-circle pt-[5px] mr-2'></i>{' '}
                            Query Done
                          </motion.div>
                        )}
                        {isQuerying && (
                          <motion.div
                            layoutId
                            initial={{ scale: 0, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0, opacity: 0, y: -20 }}
                            className='flex flex-col items-center justify-center text-white '
                          >
                            <Loading
                              // color={`fill-[${currentWholeQuery.color.toLowerCase()}] `}
                              textsize={'text-[15px]'}
                              context={'Querying... '}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nodes Query | Whole Graph Query */}
                <AnimatePresence key='Nodes Query'>
                  <motion.div className={NodesAndRelationshipHead}>
                    <i className={Headers[0].icon}></i>
                    {`${Headers[0].name} (${section.component.nodes.length})`}
                  </motion.div>
                </AnimatePresence>
                <motion.div className=' gap-x-[20px] max-w-[400px] flex-wrap flex justify-start items-center  h-auto  transition-all'>
                  {section.component.nodes.map((node, index) => (
                    <motion.button
                      disabled={isQuerying ? true : undefined}
                      whileHover={{ scale: isQuerying ? 1 : 1.05 }}
                      whileTap={{ scale: isQuerying ? 1 : 1.02 }}
                      key={index + 'Nodes Query' + node.name}
                      style={{ animationDelay: `${index * 0.2}s` }}
                      className='flex items-center justify-center w-auto h-auto animate__animated animate__zoomIn '
                      onClick={() => {
                        setCurrentWholeQuery({
                          name: node.name,
                          color: node.color,
                          type: 'Nodes',
                        });
                        setWholeQuerying(true);
                        node.onClick();
                      }}
                    >
                      <motion.div className='relative inline-flex h-auto justify-self-center '>
                        <motion.div
                          style={{
                            backgroundColor: !isQuerying
                              ? `rgba(${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(1, 3), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(1, 3), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(3, 5), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(3, 5), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(5, 7), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(5, 7), 16) -
                                    ColorDarkenValue,
                                )}, 0.2)`
                              : 'rgba(128,128,128,0.2)',
                            borderColor: !isQuerying
                              ? `rgba(${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(1, 3), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(1, 3), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(3, 5), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(3, 5), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(5, 7), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(5, 7), 16) -
                                    ColorDarkenValue,
                                )}, 1)`
                              : 'rgba(128,128,128,0.7)',
                            color: !isQuerying
                              ? `rgba(${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(1, 3), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(1, 3), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(3, 5), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(3, 5), 16) -
                                    ColorDarkenValue,
                                )}, ${Math[
                                  isComponentOpen.GlobalDarkMode ? 'max' : 'min'
                                ](
                                  parseInt(node.color.slice(5, 7), 16) +
                                    ColorDarkenValue,
                                  parseInt(node.color.slice(5, 7), 16) -
                                    ColorDarkenValue,
                                )}, 1)`
                              : 'rgba(128,128,128,1)',
                          }}
                          className={nodeTagStyle}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className=' z-0 rounded-full w-[10px] h-[10px] m-[3px] mr-[6px] items-center justify-center  transition-all duration-75'
                            style={{
                              backgroundColor: !isQuerying
                                ? `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(node.color.slice(1, 3), 16) +
                                      ColorDarkenValue,
                                    parseInt(node.color.slice(1, 3), 16) -
                                      ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(node.color.slice(3, 5), 16) +
                                      ColorDarkenValue,
                                    parseInt(node.color.slice(3, 5), 16) -
                                      ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(node.color.slice(5, 7), 16) +
                                      ColorDarkenValue,
                                    parseInt(node.color.slice(5, 7), 16) -
                                      ColorDarkenValue,
                                  )}, 2)`
                                : 'rgba(128,128,128,0.2)',
                            }}
                          >
                            <img src='ball.png' alt='' />
                          </motion.div>
                          <div>{node.name}</div>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  ))}
                </motion.div>
                {/* Relationship Query | Whole Graph Query */}
                <AnimatePresence key='Relationship Query'>
                  <motion.div className={NodesAndRelationshipHead}>
                    <i className={Headers[1].icon}></i>
                    {`${Headers[1].name} (${section.component.relationships.length})`}
                  </motion.div>
                </AnimatePresence>
                <motion.div className='gap-x-[20px] max-w-[400px] flex-wrap flex justify-start items-center  h-auto  transition-all'>
                  {section.component.relationships.map(
                    (relationship, index) => (
                      <motion.button
                        key={index + 'relationship' + relationship.name}
                        disabled={isQuerying ? true : undefined}
                        whileHover={{ scale: isQuerying ? 1 : 1.05 }}
                        whileTap={{ scale: isQuerying ? 1 : 1.02 }}
                        style={{ animationDelay: `${index * 0.2}s` }}
                        className='flex items-center justify-center w-auto h-auto animate__animated animate__zoomIn '
                        onClick={() => {
                          setCurrentWholeQuery({
                            name: relationship.name,
                            color: relationship.color,
                            type: 'Relationships',
                          });
                          setWholeQuerying(true);
                          relationship.onClick();
                        }}
                      >
                        <motion.div className='relative inline-flex h-auto justify-self-center '>
                          <motion.div
                            style={{
                              backgroundColor: !isQuerying
                                ? `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, 0.2)`
                                : 'rgba(128,128,128,0.2)',
                              borderColor: !isQuerying
                                ? `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, 1)`
                                : 'rgba(128,128,128,0.7)',
                              color: !isQuerying
                                ? `rgba(${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(1, 3),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(3, 5),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, ${Math[
                                    isComponentOpen.GlobalDarkMode
                                      ? 'max'
                                      : 'min'
                                  ](
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) + ColorDarkenValue,
                                    parseInt(
                                      relationship.color.slice(5, 7),
                                      16,
                                    ) - ColorDarkenValue,
                                  )}, 1)`
                                : 'rgba(128,128,128,1)',
                            }}
                            className={nodeTagStyle}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className=' z-0 rounded-full w-[10px] h-[10px] m-[3px] mr-[6px] items-center justify-center  transition-all duration-75'
                              style={{
                                backgroundColor: !isQuerying
                                  ? `rgba(${Math[
                                      isComponentOpen.GlobalDarkMode
                                        ? 'max'
                                        : 'min'
                                    ](
                                      parseInt(
                                        relationship.color.slice(1, 3),
                                        16,
                                      ) + ColorDarkenValue,
                                      parseInt(
                                        relationship.color.slice(1, 3),
                                        16,
                                      ) - ColorDarkenValue,
                                    )}, ${Math[
                                      isComponentOpen.GlobalDarkMode
                                        ? 'max'
                                        : 'min'
                                    ](
                                      parseInt(
                                        relationship.color.slice(3, 5),
                                        16,
                                      ) + ColorDarkenValue,
                                      parseInt(
                                        relationship.color.slice(3, 5),
                                        16,
                                      ) - ColorDarkenValue,
                                    )}, ${Math[
                                      isComponentOpen.GlobalDarkMode
                                        ? 'max'
                                        : 'min'
                                    ](
                                      parseInt(
                                        relationship.color.slice(5, 7),
                                        16,
                                      ) + ColorDarkenValue,
                                      parseInt(
                                        relationship.color.slice(5, 7),
                                        16,
                                      ) - ColorDarkenValue,
                                    )}, 2)`
                                  : 'rgba(128,128,128,0.2)',
                              }}
                            ></motion.div>
                            <div>{relationship.name}</div>
                          </motion.div>
                        </motion.div>
                      </motion.button>
                    ),
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
  return dataLoaded === true ? AccordionInside(props) : <Loading />;
};

export default Accordion;
