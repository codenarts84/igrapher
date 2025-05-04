import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

function classNames (...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown (props) {
  const ColumnStyle =
    'transition-all drak:bg-white/10  bg-gray-500/20 flex justify-between items-center  w-[140px] px-[10px] backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px]  my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';
  const [isShowing, setIsShowing] = useState(false);
  const [isOut, setIsOut] = useState(true);
  const [selectedOption, setSelectedOption] = useState();
  const options = props.options || [{ value: '=', label: 'Equal' }];

  const dropdownRef = useRef();

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsShowing(false);
    if (props.onClick) {
      props.onClick(option);
    }
    if (props.setValue) {
      props.setValue(option.value);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShowing(false);
    }
  };

  useEffect(() => {
    if (isShowing) {
      const eventListener = (event) => handleClickOutside(event);
      document.addEventListener('mousedown', eventListener);
      return () => {
        document.removeEventListener('mousedown', eventListener);
      };
    }
  }, [isShowing && isOut]);

  return (
    <Menu
      as="motion.div"
      className="relative  inline-block text-left transition-all duration-500 z-50 ESC"
    >
      <Menu.Button
        id="option"
        onMouseEnter={() => setIsOut(false)}
        onMouseLeave={() => setIsOut(true)}
        className={ColumnStyle}
        onClick={() => {
          setIsShowing(!isShowing);
        }}
        data-dropdown-toggle="dropdown"
      >
        {selectedOption || <div className="text-[12px]"> Option</div>}
        <div
          className={`transition-all ${!isShowing ? ' -rotate-90' : 'rotate-0'} `}
        >
          {' '}
          <svg
            className="w-6 h-6 mx-[17px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-500"
        enterFrom=" opacity-0 scale-0 "
        enterTo=" opacity-100 scale-100 "
        leave="transition ease-in duration-200 "
        leaveFrom=" opacity-100 scale-100"
        leaveTo=" opacity-0 scale-0 "
      >
        <Menu.Items
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-[150px] origin-top-right rounded-[14px] py-[14px] bg-gray-500/20 backdrop-blur-[25px] shadow-lg"
        >
          <motion.div layout className="py-1 pr-[17px] z-50">
            {options.map((option, index) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <motion.button
                    layout
                    onClick={() => handleOptionClick(option)}
                    className={classNames(
                      active
                        ? 'bg-gray-900/20 dark:text-white text-black'
                        : 'dark:text-gray-200 text-gray-600',
                      'ENTER flex w-full mx-4 text-[15px] rounded-[14px] text-left px-[15px] py-[10px] animate__animated animate__zoomIn z-50'
                    )}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start">
                        {selectedOption === option.label
                          ? (
                          <i className="fi fi-sr-checkbox mt-[2px] mr-[10px]"></i>
                            )
                          : (
                          <i className="fi fi-rr-square mt-[2px] mr-[10px]"></i>
                            )}
                        {option.label}
                      </div>
                      {/* <div className="flex justify-end">{option.value}</div> */}
                    </div>
                  </motion.button>
                )}
              </Menu.Item>
            ))}
          </motion.div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
