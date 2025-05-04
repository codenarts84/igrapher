import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import { motion } from 'framer-motion';
import { useLanguage } from '../help/helpFunction';
import Toast from '../component/toast';

const Message = {
  FirstHeader: ['404', '404'],
  SecondHeader: ['Sorry for the inconvenience.', '为您带来不便，深感抱歉。'],
  Status: [
    'This page is currently undergoing maintenance. Please revisit later. We are committed to providing you with a better browsing experience.',
    '状态：我们正在维护此页面。请稍后再访问。我们致力于为您提供更好的浏览体验。'
  ],
  btn1: ['Go home', '返回主页'],
  btn1web: '/home',
  btn1Icon: 'fi-rr-home-heart',
  btn2: ['Life ', '生活'],
  btn2web: '/life',
  btn2Icon: 'fi-rr-trophy-star',
  bg: 'https://cdn.pixabay.com/photo/2023/12/16/00/06/mountain-8451604_1280.jpg'
};

export default function Errorpage () {
  const lang = useLanguage();
  document.body.style.overflow = 'hidden';
  useEffect(() => {
    // 在组件挂载后自动触发 Toast
    const timeoutId = setTimeout(() => {
      Toast(
        'error',
        lang === 0
          ? 'You can not get access to the database at present.'
          : '您暂时无法访问数据库。',
        10000
      );
    }, 1000); // 1000 毫秒延时，你可以根据需要调整

    // 清除定时器以避免内存泄漏
    return () => clearTimeout(timeoutId);
  }, [lang]);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="h-[100vh] bg-gray-900/40 animate__animated animate__fadeIn  place-items-center flex justify-center  px-6 py-24 sm:py-32 lg:px-8 ">
        <div className="text-center ">
          <motion.p
            initial={{ scale: 0, y: '-90px', opacity: 0 }}
            animate={{ scale: 1, y: '0px', opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="animate__animated animate__fadeInUp text-[150px] font-semibold text-white"
          >
            {Message.FirstHeader[lang]}
          </motion.p>
          <motion.h1
            initial={{ scale: 0.9, y: '60px', opacity: 0 }}
            animate={{ scale: 1, y: '0px', opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ animationDelay: '0.2s' }}
            className="animate__animated animate__fadeInUp mt-4 py-[10px] text-6xl font-bold tracking-tight text-gray-200 sm:text-4xl"
          >
            {Message.SecondHeader[lang]}
          </motion.h1>
          <motion.p
            initial={{ scale: 0.5, y: '30px', opacity: 0 }}
            animate={{ scale: 1, y: '0px', opacity: 1 }}
            transition={{ duration: 0.9 }}
            style={{ animationDelay: '0.3s' }}
            className="animate__animated animate__fadeInUp mt-6 text-[15px] py-[15px] leading-7 text-gray-200"
          >
            {Message.Status[lang]}
          </motion.p>
          <div className="mt-10 flex items-center place-items-center justify-center gap-x-24">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="animate__animated animate__zoomIn animate__slow"
            >
              <a
                style={{ animationDelay: '0.4s' }}
                href="/"
                className="animate__animated animate__fadeInUp rounded-lg text-3xl  bg-sky-900 px-10 py-6 font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05]"
              >
                <i className={`fi  mr-6 mt-3 ${Message.btn1Icon} `}></i>
                {Message.btn1[lang]}
              </a>
            </motion.div>
            <a
              href={Message.btn2web}
              style={{ animationDelay: '0.6s' }}
              className="animate__animated animate__fadeInUp text-3xl  font-semibold text-gray-200 hover:text-white hover:scale-[1.05]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 1 }}
                initial={{ scale: 0.5, y: '30px', opacity: 0 }}
                animate={{ scale: 1, y: '0px', opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                <i className={`fi  mr-6 mt-3 ${Message.btn2Icon} `}></i>
                {Message.btn2[lang]} →
              </motion.div>
            </a>
          </div>
        </div>
      </main>
      <div
        style={{
          backgroundImage: `url(${Message.bg})`,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="background-overlay lg:h-[13%] h-[12%] sm:h-[10%] text-white"></div>
      </div>
    </div>
  );
}
