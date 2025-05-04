import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../help/ContextManager';
import axios from 'axios';
import { processNodes, processRelationships } from '../help/ProcessData';

function HistoryPanel (props) {
  const {
    setComponentOpen,
    // labelColorMapping,
    // linkColorMapping,
    setQueryData,
    wholeLabelColorMapping
  } = useAppContext();
  const [localQueryHistory, setLocalQueryHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/graph/history', {
      headers: {
        'Drawing-Record': 'true'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // 这里可以修改想要展示多少数据 我只保留了最新十条 倒叙展示
        const lastTenRecords = Object.entries(data)
          .slice(-10)
          .map(([key, value]) => ({
            id: key,
            query: value
          }))
          .reverse();

        setLocalQueryHistory(lastTenRecords);
        console.log(lastTenRecords);
      })
      .catch((error) => console.error('Failed to fetch history:', error));
  }, []);
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

  const handleHistorySelection = (query) => {
    const encodedQuery = encodeURIComponent(query);
    axios
      .get(`http://localhost:8000/graph/history/search?query=${encodedQuery}`)
      .then((resp) => {
        // update the graph data
        console.log('====');
        const response = JSON.parse(resp.data);
        console.log('data:', response);
        const nodesResponse = Object.keys(response.nodes || {}).length
          ? processNodes(Object.entries(response.nodes), wholeLabelColorMapping)
          : [];
        console.log('====');
        const linksResponse = Object.keys(response.relationships || {}).length
          ? processRelationships(
            Object.entries(response.relationships),
            wholeLabelColorMapping
          )
          : [];
        console.log('====');
        return { nodes: nodesResponse, links: linksResponse };
      })
      .then((data) => {
        console.log('????');
        console.log(data);
        setQueryData(data);
      })
      .catch((error) => console.error('Failed to fetch query:', error));

    // 关闭历史页面
    setComponentOpen((prev) => ({
      ...prev,
      HistoryQuerySetting: false,
      DockerBarPosition: 'center',
      NavBar: 'visible'
    }));
  };

  const HistoryItems = (
    <motion.div
      layout
      className="flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide"
    >
      {localQueryHistory.map(({ query }, index) => (
        <motion.div
          layout
          key={index}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ delay: 0.05 * index }}
          className="w-full py-[20px] mx-[15px] px-[28px] hover:bg-gray-200 rounded-[14px] dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            console.log(`Clicked on history item with query: ${query}`);
            handleHistorySelection(query);
          }}
        >
          <span className="text-gray-800 dark:text-gray-300 text-[15px]">{`History ${index + 1}: ${query}`}</span>
        </motion.div>
      ))}
    </motion.div>
  );

  const HistoryComponent = (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 right-[20px] bottom-0 z-40 w-[400px]  flex flex-col items-center backdrop-blur-lg border border-gray-100 dark:border-gray-700/10 py-4 px-6 mt-[10%] max-h-[70%] rounded-[28px] m-[20px] bg-gray-50/70 dark:bg-gray-800/50 overflow-hidden"
      >
        <motion.div layoutId="History" className="w-full ">
          <div className="flex items-center justify-between p-[28px]">
            <h5 className="text-[20px] mb-[20px] font-semibold text-gray-500 dark:text-white uppercase">
              History
            </h5>
            <button
              type="button"
              onClick={() =>
                setComponentOpen((prev) => ({
                  // history页面关闭
                  ...prev,
                  HistoryQuerySetting: false,
                  DockerBarPosition: 'center',
                  NavBar: 'visible'
                }))
              }
              className="ESC text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-[10px] dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-[20px] h-[20px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          {HistoryItems}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return <>{HistoryComponent}</>;
}

export default HistoryPanel;
