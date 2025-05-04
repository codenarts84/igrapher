/** @format */

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../help/ContextManager';
import { motion } from 'framer-motion';
import DropdownForQuery from './DropdownForQuery';

const NodeQueryPanel = ({ open, onClose, onSubmit, selectedNode }) => {
  const { graphData } = useAppContext();
  const [labelProperties, setLabelProperties] = useState([]);
  const [labelConditions, setLabelConditions] = useState([]);
  const [loading] = useState(false);

  const [currentQueryFeature, setCurrentQueryFeature] = useState();
  const [setcValue] = useState();
  const header =
    'text-[20px] font-[400] text-gray-900 dark:text-gray-200 flex justify-start items-center';
  const RowContainer =
    'flex w-full justify-between items-center gap-x-[20px] pb-[10px] z-50';
  const firstCol = 'flex w-[10%] justify-start items-center';
  const secondCol = 'flex w-[30%] justify-center items-center';
  const thirdCol = 'flex w-[50%] justify-end items-center';
  const inputCol =
    'drak:bg-white/30  bg-gray-500/40   w-full  backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 w-full';
  // const dropdown =
  //   ' drak:bg-white/10  bg-gray-500/20  w-full px-[10px] backdrop-blur-[5px] h-[48px] rounded-[20px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';

  // useEffect(() => {
  //   console.log('current label properties', labelProperties);
  // }, [labelProperties]);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 transform z-50 flex justify-center items-center transition-all backdrop-blur-[10px]'>
      <div className='w-[1000px] max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-600/50  px-[40px] py-[50px] transition-all'>
        <h1 className='mb-2 text-[25px] font-medium text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all'>
          {selectedNode ? `Query Panel - ${selectedNode.group}` : 'Query Panel'}
        </h1>
      </div>
    </div>
  );
};

export default NodeQueryPanel;
