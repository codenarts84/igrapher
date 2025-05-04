/** @format */

import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { login } from '../help/APIs.jsx';
import { WhiteLabel, GrayInput } from './welcome/WelcomeForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../help/ContextManager';
import Dropdown from './welcome/Dropdown.jsx';
import Loading from './Loading.jsx';

export default function modal(setIsConfig) {
  const { setComponentOpen } = useAppContext();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ColumnStyle =
    'drak:bg-white/10  bg-gray-500/20    w-full px-[10px] backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';

  const handleLogin = async () => {
    setLoading(true);
    const response = await login(scheme, url, userName, password);

    if (response === 'OK') {
      console.log('finish to get the whole graph');
      navigate('/mygraph');
      setLoading(false);
      setIsConfig.setIsConfig(false);
      setComponentOpen((prevComponentOpen) => ({
        ...prevComponentOpen,
        QuerySideBar: false,
        DockerBarPosition: 'center',
        NavBar: 'visible',
      }));
      window.location.reload();
    } else if (response === 'Wrong Password') {
      setLoading(false);
      setTimeout(() => {
        alert('Authorization failed, Please check your input.');
      }, 500);
    }
  };
  const [open, setOpen] = useState(true);
  const isOpen = true;
  const cancelButtonRef = useRef(null);

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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <motion.div layout as={Fragment}>
          <div className='fixed inset-0 bg-gray-500/5 backdrop-blur-[15px] bg-opacity-75 transition-opacity' />
        </motion.div>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child>
              <motion.div
                layout
                className='relative transform overflow-hidden w-[600px] rounded-[28px] bg-white/50 border-gray-400/10 border-[1px]  dark:bg-gray-600/50 px-[40px] py-[70px] text-left  transition-all'
              >
                {isOpen && (
                  <div className='w-[500px] mx-auto z-50'>
                    <motion.div
                      layout
                      whileFocus={{ scale: 1 }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className='flex gap-x-[50px]'>
                        <motion.div
                          layout
                          className='mb-[20px] w-[30%] transition-all'
                        >
                          <WhiteLabel text='Scheme' htmlFor='scheme' />
                          <Dropdown
                            options={[
                              { value: 'neo4j+s', label: 'neo4j+s' },
                              { value: 'neo4j+s', label: 'bolt+s' },
                            ]}
                            setValue={setScheme}
                          />
                        </motion.div>
                        <motion.div
                          layout
                          className='mb-5 w-[70%] transition-all'
                        >
                          <WhiteLabel
                            text='Connection URL'
                            htmlFor='url'
                            className={`${ColumnStyle}
                             focus:outline-none`}
                            delay={0}
                          />
                          <GrayInput
                            type='text'
                            id='url'
                            placeholder='Your URL'
                            required={true}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            delay={0.2}
                          />
                        </motion.div>
                      </div>
                      <motion.div layout className='mb-5 transition-all'>
                        <WhiteLabel text='Database user' htmlFor='username' />
                        <GrayInput
                          type='text'
                          id='username'
                          required={true}
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          delay={0.4}
                        />
                      </motion.div>

                      <motion.div layout className='mb-5 transition-all'>
                        <WhiteLabel text='Password' htmlFor='password' />
                        <GrayInput
                          type='password'
                          id='password'
                          required={true}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          delay={0.6}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                )}
                <motion.div
                  layoutId='Config'
                  className='flex justify-center items-center my-[30px]'
                >
                  <motion.div
                    layout
                    className='w-[500px] flex justify-center items-center place-items-center text-center gap-x-24 pt-[30px]'
                  >
                    <motion.button
                      layout
                      whileTap={{ width: '140%' }}
                      onClick={() => {
                        setIsConfig.setIsConfig(false);
                        setComponentOpen((prevComponentOpen) => ({
                          ...prevComponentOpen,
                          QuerySideBar: false,
                          DockerBarPosition: 'center',
                          NavBar: 'visible',
                        }));
                      }}
                      style={{ animationDelay: '0.4s' }}
                      className={` ${!isOpen ? 'w-[70%]' : `${loading ? 'w-[30%]' : 'w-[50%]'} h-[60px]`} hover:w-[70%] flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl  bg-sky-900 px-10 py-6
                  font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-50 ESC `}
                    >
                      {isOpen && (
                        <i className={'fi  mr-6 mt-2 fi fi-br-cross '}></i>
                      )}
                      {!isOpen && (
                        <i className={'fi  mr-6 mt-2 fi fi-rr-link '}></i>
                      )}
                      {!isOpen ? 'Config your graph' : 'Cancel'}
                    </motion.button>
                    <motion.button
                      layout
                      onClick={
                        scheme && url && userName && password ?
                          handleLogin
                        : null
                      }
                      whileTap={
                        scheme &&
                        url &&
                        userName &&
                        password && { width: '140%' }
                      }
                      style={{ animationDelay: '0.6s' }}
                      className={` ${!isOpen ? 'w-[30%]' : ` ${loading ? 'w-[100%]' : 'w-[50%]'} h-[60px]`}  ${!isOpen || (scheme && url && userName && password) ? 'bg-sky-900 hover:bg-sky-700 hover:w-[70%]' : 'bg-gray-400 cursor-not-allowed'}  rounded-full flex justify-center items-center animate__animated animate__fadeInUp   text-3xl  px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-50 ENTER`}
                    >
                      {!loading && (
                        <div className='px-[10px]'>
                          <i
                            className={`fi  mr-6 mt-3 ${isOpen ? 'fi-rr-link' : 'fi-rr-play'} `}
                          ></i>
                          {isOpen ? 'Connect' : 'Try'}
                        </div>
                      )}

                      {loading && <Loading />}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
