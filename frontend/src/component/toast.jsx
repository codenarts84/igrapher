import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../help/helpFunction';

const Toast = ({ type, message, duration = 5000 }) => {
  // @params: type: 'success' | 'error' | 'warning'
  // @params: message: string
  // @params: duration: number (in ms)
  const lang = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(Math.ceil(duration / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    // 在组件卸载时清除定时器
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);
  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.8, x: 300 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -300 }}
          transition={{ duration: 0.3 }}
          className={` flex items-center w-[350px] h-auto p-[28px] mb-4  rounded-[14px] shadow-[28px]  ${
            type === 'success'
              ? 'bg-green-100'
              : type === 'error'
              ? 'bg-red-100'
              : 'bg-orange-100'
          }`}
          role='alert'
        >
          <div className='flex flex-col'>
            <div
              className={`flex justify-between text-${
                type === 'success'
                  ? 'green'
                  : type === 'error'
                  ? 'red'
                  : 'orange'
              }-500 bg-${
                type === 'success'
                  ? 'green'
                  : type === 'error'
                  ? 'red'
                  : 'orange'
              }-100 rounded-lg dark:bg-${
                type === 'success'
                  ? 'green'
                  : type === 'error'
                  ? 'red'
                  : 'orange'
              }-800 dark:text-${
                type === 'success'
                  ? 'green'
                  : type === 'error'
                  ? 'red'
                  : 'orange'
              }-200`}
            >
              <div className='flex items-start flex-col'>
                {/* success */}
                { type === 'success'
                  ? (
                  <svg
                    className='w-14 h-14'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                  </svg>
                    )
                  : type === 'error'
                    // eslint-disable-next-line multiline-ternary
                    ? (
                  <svg
                    className='w-16 h-16'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
                  </svg>
                      ) : (
                  // warning
                  <svg
                    className='w-16 h-16'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z' />
                  </svg>
                      )}
              </div>
              <div className='flex flex-col justify-start ml-[10px]'>
                <span className=' text-[17px] font-black'>
                  {lang === 0 &&
                    (type === 'success'
                      ? 'Congradulation'
                      : type === 'error'
                        ? 'Error'
                        : 'Attention')}
                  {lang === 1 &&
                    (type === 'success'
                      ? '恭喜您'
                      : type === 'error'
                        ? '错误'
                        : '请注意')}
                  {` ( ${countdown} s  )`}
                </span>
                <div
                  className={`${
                    type === 'success'
                      ? 'text-green-900'
                      : type === 'error'
                      ? 'text-red-900'
                      : 'text-orange-900'
                  } text-[14px] font-normal`}
                >
                  {message}
                </div>
              </div>
              {/* <span className="sr-only">{type === 'success' ? 'Check icon' : type === 'error' ? 'Error icon' : 'Warning icon'}</span> */}
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                type='button'
                className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-8 w-8 text-${
                  type === 'success'
                    ? 'green'
                    : type === 'error'
                    ? 'red'
                    : 'orange'
                }-500 bg-${
                  type === 'success'
                    ? 'green'
                    : type === 'error'
                    ? 'red'
                    : 'orange'
                }-100 rounded-lg dark:bg-${
                  type === 'success'
                    ? 'green'
                    : type === 'error'
                    ? 'red'
                    : 'orange'
                }-800 dark:text-${
                  type === 'success'
                    ? 'green'
                    : type === 'error'
                    ? 'red'
                    : 'orange'
                }-200`}
                onClick={handleDismiss}
                aria-label='Close'
              >
                <span className='sr-only'>Close</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const showToast = (type, message, duration, offset) => {
  const toastRoot = document.getElementById('toast-root');
  const div = document.createElement('div');
  toastRoot.appendChild(div);

  const root = ReactDOM.createRoot(div);
  root.render(<Toast type={type} message={message} duration={duration} />);

  // Optional: Remove the Toast after a certain duration
  setTimeout(() => {
    root.unmount();
    toastRoot.removeChild(div);
  }, duration + 1000); // Adding 1000ms to ensure animation completion
};

export default showToast;
