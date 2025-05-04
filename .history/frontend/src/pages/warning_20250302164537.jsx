/** @format */

import { useEffect, useState } from 'react';

const MobileWarning = () => {
  //   const [isMobile, setIsMobile] = useState(false);

  //   useEffect(() => {
  //     const userAgent = navigator.userAgent.toLowerCase();
  //     const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod'];

  //     if (mobileKeywords.some((keyword) => userAgent.includes(keyword))) {
  //       setIsMobile(true);
  //     }
  //   }, []);

  //   if (!isMobile) return null;

  return (
    <div className='inset-0 top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full p-4 text-center text-white bg-black bg-opacity-75'>
      <h2 className='text-2xl font-bold'>请使用电脑访问</h2>
      <p className='mt-2'>这是一个桌面端应用，在手机上可能无法正常使用。</p>
    </div>
  );
};

export default MobileWarning;
