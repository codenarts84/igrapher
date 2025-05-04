/** @format */

import React, { useState, useEffect } from 'react';

const NodeQueryPanel = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const AA = setTimeout();
  }, []);
  return (
    open && (
      <div
        onClick={() => setOpen(false)}
        className='fixed top-0 left-0 right-0 bottom-0 transform z-50 flex justify-center items-center transition-all backdrop-blur-[10px]'
      >
        <div className='w-[1000px] max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-600/50  px-[40px] py-[50px] transition-all'>
          <h1 className='mb-2 text-[25px] font-medium text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all'>
            Notify
          </h1>
          <p></p>
        </div>
      </div>
    )
  );
};

export default NodeQueryPanel;
