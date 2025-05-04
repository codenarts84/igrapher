/** @format */

import React, { useState, useEffect } from 'react';

const NodeQueryPanel = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const AA = setTimeout(() => setOpen(true), 2000);
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
        <div className='w-[600px] animate__animated overflow-hidden animate__fadeInUp max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-600/50  px-[40px] py-[50px] transition-all'>
          <h1 className='mb-[30px] text-[35px]  text-center font-medium font-center text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all'>
            Notify
          </h1>
          <p className='text-white text-[20px] animate__animated animate__fadeInUp'>
            Welcome to visit this App, this is a demo, some feature is not
            available due to I don't have a server, full code file is under the
            boxframe. In this project, I responsible for UI/UX and animation
            design and development, and some part of backend development data
            processsing and API development.
          </p>
          <a
            href='https://github.com/Xianzhezhang97/igrapher'
            target='_blank'
            rel='noopener noreferrer'
            className={`mt-[60px]  h-[60px] bg-sky-900 hover:bg-sky-700  flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl   px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300 `}
          >
            Github Link
          </a>
        </div>
      </div>
    )
  );
};

export default NodeQueryPanel;
