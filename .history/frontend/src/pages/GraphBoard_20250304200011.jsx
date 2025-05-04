/** @format */

import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import QuerySideBar from '../component/QuerySideBar';
import DockerBar from '../component/DockerBar';
// import GraphDrawing from '../component/WholeGraph/GraphDrawing';
import ViewSetting from '../component/ViewSetting';
import { motion, AnimatePresence } from 'framer-motion';
import BG from '../component/gfBG';
import { useAppContext } from '../help/ContextManager';
import GraphCanvas from '../component/WholeGraph/GraphCanvas';
import HistoryQuerySetting from '../component/HistoryQuerySetting';

function GraphBoard() {
  const { isComponentOpen, setComponentOpen } = useAppContext();
  const { cursorEvent } = useAppContext();

  // Test mode: query side bar open all the time
  useEffect(() => {
    const delayOpen = setTimeout(() => {
      setComponentOpen((prev) => ({
        ...prev,
        QuerySideBar: true,
      }));
    }, 500);
    return () => {
      clearTimeout(delayOpen);
    };
  }, []);
  // ------------------------------

  const GraphBoard = (
    <motion.div
      layout
      layoutId='newGraph'
      className={`flex bg-white  ${cursorEvent}`}
    >
      <Navbar />
      <AnimatePresence>
        <div>
          {isComponentOpen.QuerySideBar && <QuerySideBar />}
          {/* <div className="bg-white dark:bg-gray-800/0"> */}
          <div className='z-20  absolute w-[100%] h-[100%]'>
            <GraphCanvas />
          </div>
          {/* </div> */}
          {isComponentOpen.DockerBar && <DockerBar />}
          {isComponentOpen.ViewSetting && <ViewSetting />}
          {isComponentOpen.HistoryQuerySetting && <HistoryQuerySetting />}
          <motion.div
            layoutId='BG'
            className='absolute w-[100vw] h-[100vh] invisible dark:visible'
          >
            <BG />
          </motion.div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
  return <div className=''>{GraphBoard}</div>;
}

export default GraphBoard;
