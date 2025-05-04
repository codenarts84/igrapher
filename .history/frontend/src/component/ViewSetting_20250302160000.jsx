/** @format */

// ViewSetting.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../help/ContextManager';

function ViewSetting(props) {
  const { setComponentOpen } = useAppContext();
  const { graphSetting, setGraphSetting } = useAppContext();
  const [hasEntered, setHasEntered] = useState(false);

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

  const styles = [
    {
      id: 'nodeSize',
      name: 'Node Size',
      defaultValue: graphSetting.nodeSize,
      maxValue: 50,
    },
    {
      id: 'nodeResolution',
      name: 'Node Resolution',
      defaultValue: graphSetting.nodeResolution,
      maxValue: 30,
    },
    {
      id: 'nodeOpacity',
      name: 'Node Opacity',
      defaultValue: graphSetting.nodeOpacity,
      maxValue: 1,
    },
    {
      id: 'linkWidth',
      name: 'Link Width',
      defaultValue: graphSetting.linkWidth,
      maxValue: 10,
    },
    {
      id: 'linkLength',
      name: 'Link Length',
      defaultValue: graphSetting.linkLength,
      maxValue: 200,
    },
    {
      id: 'linkResolution',
      name: 'Link Resolution',
      defaultValue: graphSetting.linkResolution,
      maxValue: 30,
    },
    {
      id: 'linkOpacity',
      name: 'Link Opacity',
      defaultValue: graphSetting.linkOpacity,
      maxValue: 1,
    },
  ];

  const [currentValues, setCurrentValues] = useState(
    styles.map((style) => style.defaultValue),
  );

  const handleSettingChange = (feature) => {
    setGraphSetting(feature);
  };

  const handleSliderChange = (index, value) => {
    const newValues = [...currentValues];
    newValues[index] = Number(parseFloat(value));
    // console.log('style', newValues);
    setCurrentValues(newValues);

    handleSettingChange({
      ...graphSetting,
      [styles[index].id]:
        styles[index].id === 'linkWidth' ? parseInt(value) : Number(value),
    });
  };

  const SliderGroup = (
    <motion.div
      layout
      onMouseEnter={() => setHasEntered(true)}
      onMouseLeave={() => setHasEntered(false)}
      className='flex-col justify-center pb-[20px]'
      role='group'
    >
      {styles.map((style, index) => (
        <motion.div layout key={index} className='w-full pb-[5px]'>
          <div className='flex items-center justify-between'>
            <label
              htmlFor={`default-range-${index}`}
              style={{ animationDelay: `${0.15 * index}s` }}
              className='animate__animated animate__zoomIn flex mb-2 text-[15px] font-medium text-gray-400 dark:text-gray-400'
            >
              {style.name}
            </label>
            <label
              htmlFor={`default-range-${index}`}
              style={{
                animationDelay: `${0.15 * index}s`,
                animationDuration: '1s',
              }}
              className='animate__animated animate__zoomIn flex mb-2 text-[10px] font-medium text-gray-400 dark:text-gray-400'
            >
              {currentValues[index]}
            </label>
          </div>
          <motion.input
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ width: '0%' }}
            transition={{
              duration: 0.5,
              delay: hasEntered === false ? 0.1 * index : 0,
            }}
            key={index}
            layout
            whileTap={{ borderRadius: '10px', height: '30px' }}
            id={`range-${index}`}
            type='range'
            step={style.maxValue / 1000}
            value={currentValues[index]}
            onChange={(e) => handleSliderChange(index, e.target.value)}
            max={style.maxValue}
            className='w-full h-[5px] mb-[4px] bg-gray-900/5 p-2 rounded-full appearance-none cursor-pointer range-lg dark:bg-white/5'
          />
        </motion.div>
      ))}
    </motion.div>
  );
  const Settings = [
    {
      name: 'Graph Type',
      icon: 'fi fi-sr-interactive pt-[5px]',
      component: (
        <motion.div
          layout
          style={{ animationDelay: '0.5s' }}
          className='animate__animated animate__zoomIn flex justify-center py-[10px]'
          role='group'
        >
          <motion.button
            type='button'
            layout
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            whileTap={{ width: '125%' }}
            onClick={() => {
              setGraphSetting((prevGraphSetting) => ({
                ...prevGraphSetting,
                GraphType: '3D',
              }));
            }}
            className={`${graphSetting.GraphType === '3D' ? 'ring-gray-500/50 bg-gradient-to-r from-sky-500/50 from-10% to-emerald-500/50 to-90% text-white' : ''} w-[100%] px-16 py-2 text-[15px] font-medium text-gray-400  border-t border-b border-l border-gray-400 rounded-s-full hover:bg-gray-500 hover:text-white focus:z-10  dark:text-white dark:hover:text-white dark:hover:bg-gray-700 `}
          >
            3D
          </motion.button>
          <motion.button
            layout
            type='button'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            whileTap={{ width: '125%' }}
            onClick={() => {
              setGraphSetting((prevGraphSetting) => ({
                ...prevGraphSetting,
                GraphType: '2D',
              }));
            }}
            className={`${graphSetting.GraphType === '2D' ? 'ring-gray-500/50 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500 text-white' : ''} w-[100%] px-16 py-2 text-[15px] font-medium text-gray-400  border border-gray-400 rounded-e-full hover:bg-gray-500 hover:text-white   dark:text-white dark:hover:text-white dark:hover:bg-gray-700 `}
          >
            2D
          </motion.button>
        </motion.div>
      ),
    },
    {
      name: 'Graph Style',
      icon: 'fi fi fi-sr-arrows pt-[5px]',
      component: SliderGroup,
    },
  ];
  const ViewSetting = (
    <AnimatePresence>
      <motion.div
        layout
        className='fixed top-0 right-[20px] bottle-0 z-40  h-full w-[400px] flex items-center  transition-all'
      >
        <AnimatePresence>
          <motion.div className='bg-gray-50/70 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-100 dark:border-gray-700/10  py-[20px] px-[28px] mt-[10%] w-full h-auto max-h-[80%]  rounded-[28px] m-[20px]  overflow-x-hidden overflow-y-scroll scrollbar-hide transition-all '>
            <motion.div>
              <motion.div
                layout
                layoutId='Setting'
                className='z-50 flex items-center justify-between transition-all'
              >
                <h5
                  style={{ animationDelay: '0.3s' }}
                  className='animate__animated animate__zoomIn text-[20px] my-[10px] font-semibold text-gray-500 uppercase dark:text-white transition-all'
                >
                  View Setting
                </h5>
                {/* 关闭按钮 */}
                <button
                  type='button'
                  onClick={() => {
                    setComponentOpen((prevComponentOpen) => ({
                      ...prevComponentOpen,
                      ViewSetting: false,
                      DockerBarPosition: 'center',
                      NavBar: 'visible',
                    }));
                  }}
                  style={{ animationDelay: '0.5s' }}
                  className='ESC animate__animated animate__zoomIn text-gray-400  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[20px] p-1.5  top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white transition-all'
                >
                  <svg
                    aria-hidden='true'
                    className='w-10 h-10'
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
              </motion.div>
              <AnimatePresence>
                <motion.div
                  layout
                  layoutId='SettingComponentCaptureAnimation'
                  className='flex-col'
                >
                  {Settings.map((setting, index) => (
                    <div key={index}>
                      <h5
                        style={{ animationDelay: `${0.2 * index}s` }}
                        className='animate__animated animate__zoomIn text-[18px] my-[5px] font-semibold text-gray-400 dark:text-gray-200 transition-all'
                      >
                        {setting.name}
                      </h5>
                      {setting.component}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  return <div className=''>{ViewSetting}</div>;
}

export default ViewSetting;
