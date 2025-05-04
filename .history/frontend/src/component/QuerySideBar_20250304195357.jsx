/** @format */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Accordion from './AC';
import { useAppContext } from '../help/ContextManager';

function QuerySideBar(props) {
  const { setComponentOpen, isComponentOpen } = useAppContext();
  const [isOpen, setisOpen] = React.useState(false);
  useEffect(() => {
    const handleKeyPress = (event) => {
      // 检查按下的键是否是回车键或者 ESC 键
      if (event.key === 'Enter' || event.key === 'Escape') {
        // 找到所有包含 ENTER 或 ESC 类的元素
        const buttons = document.querySelectorAll('.ENTER, .ESC');

        // 遍历每个元素
        buttons.forEach((button) => {
          // 检查元素类名中是否包含 'ENTER' 或 'ESC'
          const hasEnterClass = button.classList.contains('ENTER');
          const hasEscClass = button.classList.contains('ESC');

          // 如果按下的是回车键，并且元素包含 'ENTER' 类，则触发点击事件
          if (event.key === 'Enter' && hasEnterClass) {
            button.click();
          }

          // 如果按下的是 ESC 键，并且元素包含 'ESC' 类，则触发点击事件
          if (event.key === 'Escape' && hasEscClass) {
            button.click();
          }
        });
      }
    };

    // 添加事件监听器
    document.addEventListener('keydown', handleKeyPress);

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  useEffect(() => {
    const delayOpen = setTimeout(() => {
      setComponentOpen(
        ...isComponentOpen,
        setComponentOpen(isComponentOpen.QuerySideBar),
      );
    }, 500);
    return () => {
      clearTimeout(delayOpen);
    };
  }, []);

  const QuerySideBar = (
    <AnimatePresence>
      <motion.div className=' fixed top-[10vh] left-[20px] bottle-[10vh] z-40  w-[400px] flex items-center h-[80vh]   transition-all'>
        <motion.div
          layoutId='Query'
          // transition={{ ease: 'easeInOut' }}
          className='-pt-[10vh] relative bg-gray-50/70 dark:bg-gray-800/50 backdrop-blur-[5px] border border-gray-100 dark:border-gray-700/10   w-full h-auto max-h-[80vh]  rounded-[28px] ml-[20px] '
        >
          {/* Header modual */}
          <motion.div className=' pt-[20px] px-[28px] flex-col items-center sticky top-0 z-40   transition-all'>
            <div className='flex justify-between'>
              <div className='flex-col'>
                <h5 className='animate__animated animate__zoomIn text-[20px] my-[10px] font-semibold text-gray-500 uppercase dark:text-white transition-all'>
                  Query Menu
                </h5>
                <motion.label
                  layout
                  className='relative inline-flex flex-col cursor-pointer'
                >
                  <div className='inline-flex items-center'>
                    {/* {con} */}
                    <motion.div
                      layout
                      className={`animate__animated animate__fadeInLeft w-20 h-10 flex items-center rounded-full p-2 cursor-pointer ${
                        isOpen === true
                          ? 'justify-end bg-gradient-to-r from-sky-500 to-emerald-500'
                          : 'justify-start  bg-gray-300 dark:bg-gray-700/20'
                      }`}
                      onClick={() => {
                        setisOpen(!isOpen);
                      }}
                    >
                      <motion.div
                        layout
                        className={'w-6 h-6 bg-white/50 rounded-full'}
                      />
                    </motion.div>
                    <div className='flex flex-col'>
                      <span className='animate__animated animate__fadeInRight ms-3 text-[10px] font-medium text-gray-900 dark:text-gray-400'>
                        Instruction
                      </span>
                      <motion.span
                        layout
                        className={`${
                          isOpen
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-red-700 dark:text-red-400'
                        } animate__animated animate__fadeInLeft ms-3 text-[6px] font-medium `}
                      >
                        {isOpen ? 'ON' : 'OFF'}
                      </motion.span>
                    </div>
                  </div>
                </motion.label>
              </div>
              {/* 关闭按钮 */}
              <button
                type='button'
                onClick={() => {
                  setComponentOpen((prevComponentOpen) => ({
                    ...prevComponentOpen,
                    QuerySideBar: false,
                    DockerBarPosition: 'center',
                    NavBar: 'visible',
                  }));
                }}
                className='ESC animate__animated animate__zoomIn text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[20px] p-[5px] my-[20px] top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white transition-all'
              >
                <svg
                  aria-hidden='true'
                  style={{ animationDelay: '0.5s' }}
                  className='w-10 h-10 transition-all animate__animated animate__zoomIn'
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
              </button>
            </div>

            {/* 搜索栏 */}
            <form className='animate__animated animate__zoomIn flex items-center  w-full mx-auto my-[20px] transition-all z-10'>
              <label htmlFor='voice-search' className='sr-only'>
                Search
              </label>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-[10px] pointer-events-none'>
                  <svg
                    style={{ animationDelay: '0.7s' }}
                    className='w-[20px] h-[20px] text-gray-500 dark:text-gray-400 animate__animated animate__zoomIn  transition-all'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 21 21'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  id='voice-search'
                  className='bg-gray-50/0 border border-gray-300  text-gray-900 text-[15px] rounded-full focus:ring-blue-500  block w-full ps-[40px] p-2.5  dark:bg-gray-700/0 dark:border-gray-600 dark:placeholder-gray-400/0 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search Node...'
                  required=''
                />
                <button className='absolute inset-y-0 end-0 flex items-center pe-[10px]'>
                  <svg
                    style={{ animationDelay: '1.2s' }}
                    className='w-[20px] h-[20px] text-gray-800 dark:text-white animate__animated animate__zoomIn  transition-all'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeWidth='2'
                      d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
          {/* Query Body */}
          <motion.div layoutId='QueryComponentCaptureAnimation'>
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layoutScroll
              className='max-h-[55vh] w-[400px] overflow-x-hidden overflow-y-scroll scrollbar-hide transition-all scroll-smooth '
            >
              <motion.div className='px-[28px]'>
                <Accordion isOpen={isOpen} className='z-50' />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return <div className=''>{QuerySideBar}</div>;
}

export default QuerySideBar;
