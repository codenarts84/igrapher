/** @format */

import React, { useState, useEffect } from 'react';

const NodeQueryPanel = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const AA = setTimeout(() => setOpen(true), 1000);
    return () => {
      clearTimeout(AA);
    };
  }, []);
  return (
    open && (
      <div
        onClick={() => setOpen(false)}
        className='fixed top-0 left-0 right-0 bottom-0 transform z-40 flex justify-center items-center transition-all backdrop-blur-[10px]'
      >
        <div className='w-[600px] animate__animated overflow-hidden animate__fadeInUp max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-700/70  px-[40px] py-[50px] transition-all'>
          <h1 className='mb-[30px] text-[35px]  text-center font-medium font-center text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all'>
            Notification
          </h1>
          <p className='text-white my-[15px] text-[17px] animate__animated animate__fadeInUp'>
            Welcome to this app! I am{' '}
            <a
              className='p-1 hover:underline font-[600]'
              href='https://xianzhe.site/'
            >
              Scott Cheung
            </a>
            . This is a demo version, and some features are unavailable because
            there is no server. The full source code is below.
          </p>
          <p className='text-white my-[15px] text-[17px] animate__animated animate__fadeInUp'>
            In this project, I was 100% responsible for UI/UX design,
            animations, component development for frontend development.
            Additionally, I worked on backend data processing and API
            development.
          </p>

          <div className='flex items-center justify-center mt-10 place-items-center gap-x-24'>
            <a
              href='https://github.com/Xianzhezhang97/igrapher'
              target='_blank'
              rel='noopener noreferrer'
              className={`mt-[60px] w-full h-[60px] bg-gray-900 hover:bg-sky-700  flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl   px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300 `}
            >
              Github Link
            </a>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className={`mt-[60px] w-full  h-[60px] bg-sky-900 hover:bg-sky-700  flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl   px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300 `}
            >
              I know
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NodeQueryPanel;
