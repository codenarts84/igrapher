/** @format */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../Datebase.json';
import { useAppContext } from '../help/ContextManager';
import { useNavigate } from 'react-router-dom';
import Modal from './config.jsx';
// import Cookies from 'js-cookie';
// import axios from 'axios';

const navbarItem = data.Navbar.navbarItem;
function Navbar({ topTextColor, BG, ExpandElement, onHeightChange }) {
  const { isComponentOpen, setComponentOpen } = useAppContext();
  const [isConfig, setIsConfig] = useState(false);
  const isTopTextColorWhite = topTextColor;
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentPage = window.location.pathname;
  const isHomeOrRoot = currentPage === '/' || currentPage === '/home';
  const [selectedTab, setSelectedTab] = useState(null);
  const navigateTo = useNavigate();
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    function handleScroll1() {
      if (window.scrollY < 1) {
        setIsExpanded(true);
        setIsTop(true);
      } else {
        setIsExpanded(false);
        setIsTop(false);
        setSelectedTab(null);
      }
    }

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    let scrollTimer;
    function handleScrollStatus(event) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (Math.abs(event.deltaY) > 100) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }
      }, []);
    }

    window.addEventListener('scroll', handleScroll1);
    window.addEventListener('wheel', handleScrollStatus);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll1);
      window.removeEventListener('wheel', handleScrollStatus);
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded, selectedTab]);

  const navbar = (
    <AnimatePresence>
      <motion.div
        onMouseLeave={() => setSelectedTab(null)}
        layout
        className='sticky top-0 z-40 '
      >
        <nav
          className={` fixed w-full flex flex-col  transition-all duration-500
        ${
          isComponentOpen.NavBar === 'visible' && ' left-0 right-0  top-[10px] '
        }
        ${
          isComponentOpen.NavBar === 'hide' &&
          'scale-50 left-0 right-0 -top-[100px]'
        }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            layout
            transition={{ transition: { duration: 1 } }}
            className={`flex flex-col w-full ${BG} overflow-hidden pt-[20px]
        ${
          windowWidth < 768
            ? `p-[5px]  ${isTop ? 'h-auto' : 'h-auto'}`
            : `${
                isTop
                  ? `${isHomeOrRoot ? 'px-[5%] pt-[6vh] ' : 'pt-3'} h-auto`
                  : ''
              }  md:px-10`
        }
        ${
          isScrolling
            ? `${isTop ? '' : 'backdrop-blur-lg bg-white/0 shadow-xl'}`
            : `${isTop ? '' : 'backdrop-blur-lg bg-white/80 shadow-xl'}`
        }`}
          >
            <div className='flex items-center justify-center w-full '>
              <div className='container lg:px-[10%]'>
                <div className='flex justify-between w-full smoothchange place-items-center '>
                  <motion.a
                    whileHover={{ scale: 1.03, transition: { duration: 1 } }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    data-popover-target={'version'}
                    layout
                    href='/'
                    className={`${
                      isTop & isTopTextColorWhite
                        ? 'text-[40px] text-white dark:text-gray-400'
                        : 'text-[25px] text-gray-700 dark:text-gray-400'
                    } flex items-center justify-center gap-x-[10px] 
                      font-black cursor-pointer select-none`}
                  >
                    <motion.img
                      src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDY3Ny41IDI0Mi40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NzcuNSAyNDIuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiAuc3Qwe2ZpbGw6IzIzMUYyMDt9IC5zdDF7ZmlsbDojMDE0MDYzO30gPC9zdHlsZT4gPGc+IDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMzcuOCw2MS45Yy0zNS4zLDAtNTguOSwyMC41LTU4LjksNjAuNHYyOC40YzMuNS0xLjcsNy4zLTIuNiwxMS40LTIuNnM4LDEsMTEuNSwyLjd2LTI4LjUgYzAtMjUuOCwxNC4yLTM5LjEsMzYtMzkuMXMzNiwxMy4zLDM2LDM5LjF2NjIuMWgyMi45di02Mi4xQzE5Ni43LDgyLjIsMTczLDYxLjksMTM3LjgsNjEuOUwxMzcuOCw2MS45eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjA5LjIsMTI0LjdjMC0zNi4yLDI2LjYtNjIuOCw2NC4yLTYyLjhzNjMuOCwyNi42LDYzLjgsNjIuOHY4LjVIMjMzLjNjMy40LDIxLjMsMTkuMywzMy4xLDQwLjEsMzMuMSBjMTUuNSwwLDI2LjMtNC44LDMzLjMtMTUuMmgyNS40Yy05LjIsMjIuMi0zMC45LDM2LjUtNTguNywzNi41QzIzNS43LDE4Ny41LDIwOS4yLDE2MSwyMDkuMiwxMjQuN0wyMDkuMiwxMjQuN3ogTTMxMywxMTIuNyBjLTQuNi0xOS4xLTIwLjMtMjkuNS0zOS42LTI5LjVzLTM0LjgsMTAuNi0zOS40LDI5LjVIMzEzeiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQ5LjUsMTI0LjdjMC0zNi4yLDI2LjYtNjIuOCw2NC4yLTYyLjhzNjQuMiwyNi42LDY0LjIsNjIuOGMwLDM2LjItMjYuNiw2Mi44LTY0LjIsNjIuOCBTMzQ5LjUsMTYxLDM0OS41LDEyNC43eiBNNDU0LjcsMTI0LjdjMC0yNC4yLTE2LjQtNDEuNS00MS4xLTQxLjVzLTQxLjEsMTcuNC00MS4xLDQxLjVjMCwyNC4xLDE2LjQsNDEuNSw0MS4xLDQxLjUgUzQ1NC43LDE0OC45LDQ1NC43LDEyNC43eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjA5LjEsMjA4LjFoMi43YzE0LjcsMCwyMC4zLTYuNSwyMC4zLTIzLjRWNjUuOUg2NTV2MTE3LjNjMCwyOS41LTExLjYsNDQuNy00MS4xLDQ0LjdoLTQuOEw2MDkuMSwyMDguMSBMNjA5LjEsMjA4LjF6Ij48L3BhdGg+IDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01OTcuNiwxOTUuOWgtMjIuOXYtMjguM2gtNTguMmMtMTEuNiwwLTIxLjctNS43LTI2LjMtMTQuOGMtNC4zLTguNi0zLjEtMTguNywzLjEtMjcuMkw1NDUuNiw1NyBjNy41LTEwLjEsMjAuMi0xNC4yLDMyLjItMTAuMmMxMiw0LDE5LjgsMTQuNywxOS44LDI3LjN2NzMuMWgxNy4ydjIwLjRoLTE3LjJWMTk1LjlMNTk3LjYsMTk1Ljl6IE01MTIuNiwxMzguMSBjLTAuNywwLjktMS4xLDIuMS0xLjEsMy40YzAsMy4yLDIuNiw1LjgsNS44LDUuOGg1Ny41VjczLjZjMC0zLjgtMi44LTUuMi00LTUuNmMtMC41LTAuMS0xLjItMC4zLTIuMS0wLjNjLTEuNCwwLTMuMSwwLjUtNC42LDIuNCBMNTEyLjYsMTM4LjFMNTEyLjYsMTM4LjFMNTEyLjYsMTM4LjF6Ij48L3BhdGg+IDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNC42LDEyNS44Yy0zLDEuNS01LjgsNC03LjgsNy4zYy0yLDMuMy0yLjgsNi44LTIuNSwxMC4zYzAuMyw2LjMsMy44LDEyLjEsOS41LDE1LjNjNS4zLDMsMTEuMywyLjMsMTcsMSBjNy0xLjgsMTMtMi41LDE5LjMsMS4zYzAsMCwwLDAsMC4zLDBjMTAuOCw2LjMsMTAuOCwyMi4xLDAsMjguNGMwLDAsMCwwLTAuMywwYy02LjMsMy44LTEyLjMsMy0xOS4zLDEuM2MtNS41LTEuNS0xMS41LTIuMy0xNywxIGMtNS44LDMuMy05LDkuMy05LjUsMTUuM2MtMC4zLDMuNSwwLjUsNywyLjUsMTAuM2MyLDMuMyw0LjUsNS44LDcuOCw3LjNjNS41LDIuOCwxMi4zLDIuOCwxOC0wLjVjNS4zLTMsNy44LTguOCw5LjMtMTQuMyBjMi03LDQuMy0xMi42LDEwLjgtMTYuMWM2LjMtMy44LDEyLjMtMywxOS4zLTEuM2M1LjUsMS41LDExLjUsMi4zLDE3LTFjNS44LTMuMyw5LTkuMyw5LjUtMTUuM2MwLTAuNSwwLTAuOCwwLTEuMyBjMC0wLjUsMC0wLjgsMC0xLjNjLTAuMy02LjMtMy44LTEyLjEtOS41LTE1LjNjLTUuMy0zLTExLjMtMi4zLTE3LTFjLTcsMS44LTEzLDIuNS0xOS4zLTEuM2MtNi4zLTMuOC04LjgtOS4xLTEwLjgtMTYuMSBjLTEuNS01LjUtNC0xMS4xLTkuMy0xNC4zQzM2LjgsMTIzLjEsMzAuMSwxMjMuMSwyNC42LDEyNS44eiI+PC9wYXRoPiA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjQzLjYsMTcuMmMtMTAuOCwwLTE5LjYsOC44LTE5LjYsMTkuNnM4LjgsMTkuNiwxOS42LDE5LjZjMTAuOCwwLDE5LjYtOC44LDE5LjYtMTkuNlM2NTQuNCwxNy4yLDY0My42LDE3LjJ6ICI+PC9wYXRoPiA8L2c+IDwvc3ZnPiA='
                      className={`p-[4px] dark:invert ${
                        isHomeOrRoot ? 'invert' : ''
                      } `}
                    ></motion.img>
                    iGrapher
                  </motion.a>

                  <div className='flex items-center max-w-[80%] overflow-show'>
                    <AnimatePresence>
                      {windowWidth > 876 && (
                        <motion.div
                          layout
                          key={'main-navigation'}
                          transition={{ duration: 0.3 }}
                          exit={{
                            opacity: 0,
                            scale: 0,
                            x: -100,
                            transition: { duration: 1 },
                          }}
                          id='main-navigation'
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'horizontal',
                            overflow: 'hidden',
                            WebkitScrollbarButton: {
                              display: 'none',
                            },
                          }}
                          className='flex items-center justify-center w-full my-3 text-center place-items-center '
                        >
                          {navbarItem.map((item, index) => (
                            <div key={`${item.name[0]}-${index}`}>
                              <motion.button
                                layout
                                layoutId={item.name[0]}
                                whileHover={{
                                  scale: 1.05,
                                  transition: { duration: 0.7 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                onClick={
                                  item.name[0] === 'Config'
                                    ? () => {
                                        setIsConfig(true);
                                        setComponentOpen(
                                          (prevComponentOpen) => ({
                                            ...prevComponentOpen,
                                            QuerySideBar: false,
                                            ViewSetting: false,

                                            DockerBarPosition: 'hide',
                                            NavBar: 'hide',
                                          }),
                                        );
                                      }
                                    : null
                                }
                                onMouseEnter={() =>
                                  setSelectedTab(item.name[0])
                                }
                              >
                                <a
                                  onClick={() => {
                                    navigateTo(item.href);
                                  }}
                                  key={`${item.href}=${index}`}
                                  style={{ animationDelay: `${index * 0.2}s` }}
                                  data-popover-target={`nav-des-${item.name[0]}`}
                                  type='button'
                                  className={`rounded-[5px] smoothchange items-center  ${
                                    isTop
                                      ? `${
                                          index === navbarItem.length - 1
                                            ? 'ml-4'
                                            : 'mx-4'
                                        }`
                                      : ` ${
                                          index === navbarItem.length - 1
                                            ? 'ml-1'
                                            : 'mx-1'
                                        }`
                                  } animate__animated animate__fadeInUp relative inline-flex items-center  px-6 py-3 text-[20px] font-medium text-center ${
                                    isTopTextColorWhite & isTop
                                      ? 'text-white dark:text-gray-400'
                                      : ''
                                  } rounded-lg hover:bg-gray-900/20  `}
                                >
                                  <div className='items-center mr-3 w-11 h-11'>
                                    <div className='flex-shrink-0'>
                                      <i
                                        className={`${
                                          isTopTextColorWhite & isTop
                                            ? 'text-white text-[20px] dark:text-gray-400'
                                            : 'text-gray-900 text-[17px] dark:text-gray-400'
                                        }  fi ${item.icon}`}
                                      ></i>
                                    </div>
                                  </div>
                                  <div
                                    className={`${
                                      isTopTextColorWhite & isTop
                                        ? 'text-white text-[20px] dark:text-gray-400'
                                        : 'text-gray-900 text-[15px] dark:text-gray-400'
                                    } md:hidden lg:flex `}
                                  >
                                    {item.name[0]}
                                  </div>
                                </a>
                              </motion.button>
                            </div>
                          ))}
                          <motion.label
                            layout
                            className='ml-[20px] flex justify-start items-center relative cursor-pointer'
                          >
                            <div className='inline-flex items-center'>
                              <motion.div
                                className={`animate__animated animate__fadeInLeft w-20 h-10 flex items-center rounded-full p-2 cursor-pointer ${
                                  isComponentOpen.GlobalDarkMode
                                    ? 'justify-end bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-700 dark:to-emerald-700'
                                    : 'justify-start bg-gray-300 dark:bg-gray-700/20'
                                }`}
                                onClick={() => {
                                  setComponentOpen((prevComponentOpen) => ({
                                    ...prevComponentOpen,
                                    GlobalDarkMode:
                                      !isComponentOpen.GlobalDarkMode,
                                  }));
                                  toggleDarkMode();
                                }}
                              >
                                <motion.div
                                  className={
                                    'w-6 h-6 bg-white/50 dark:bg-gray-800/50 rounded-full'
                                  }
                                  layout
                                />
                              </motion.div>
                              <div className='flex flex-col'>
                                <span className='animate__animated animate__fadeInRight ms-3 text-[10px] font-medium text-gray-400 dark:text-gray-400'>
                                  Dark Mode
                                </span>
                                <span
                                  className={`${
                                    isComponentOpen.GlobalDarkMode
                                      ? 'text-green-700 dark:text-green-400'
                                      : 'text-red-700 dark:text-red-400'
                                  } text-left animate__animated animate__fadeInLeft ms-3 text-[6px] font-medium `}
                                >
                                  {isComponentOpen.GlobalDarkMode
                                    ? 'ON'
                                    : 'OFF'}
                                </span>
                              </div>
                            </div>
                          </motion.label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </nav>
      </motion.div>
      {/* <AnimatePresence> */}
      {isConfig && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
        >
          <Modal setIsConfig={setIsConfig} />
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </AnimatePresence>
  );

  return <motion.div layout>{navbar}</motion.div>;
}

export default Navbar;
