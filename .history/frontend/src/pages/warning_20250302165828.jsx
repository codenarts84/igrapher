/** @format */

import { useEffect, useState } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod'];

    if (mobileKeywords.some((keyword) => userAgent.includes(keyword))) {
      setIsMobile(true);
    }
  }, []);

  if (!isMobile) return null;

  return (
    <div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full p-4 text-center text-white bg-black/30 backdrop-blur-[10px]'>
      <h2 className='font-bold text-7xl'>请使用电脑访问</h2>
      <h2 className='mt-2 text-4xl font-bold'>
        {' '}
        Please use computer to access
      </h2>
      <div className='h-[40vh]'></div>
      <p className='mt-[30px] text-[15px]'>
        This is a desktop application and may not work properly on mobile
        phones. Please switch to your computer for the best experience.{' '}
      </p>
      <p className='mt-2 text-[15px]'>
        这是一个桌面端应用，在手机上可能无法正常使用。
        请切换到电脑以获得最佳体验。
      </p>
      <a
        href='/'
        className={`  h-[60px] bg-sky-900 hover:bg-sky-700 hover:w-[70%] flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl   px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300 `}
      >
        Refresh
      </a>
    </div>
  );
};

export default MobileWarning;
