/** @format */

import { useState, React } from 'react';
import data from '../../Datebase.json';
import { useLanguage } from '../../help/helpFunction';
import { motion } from 'framer-motion';
import { WhiteLabel, GrayInput } from './WelcomeForm';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import Loading from '../Loading';

const ColumnStyle =
  'bg-white/10 flex justify-between items-center  w-full px-[10px] backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px]  my-[10px] text-[17px] text-white  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';

function Welcome() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const lang = useLanguage();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/newgraph');
      setLoading(false);
    }, 500);
  };

  const sample = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/newgraph');
      setLoading(false);
    }, 500);
  };
  const Welcome = (
    <div className='flex items-center justify-center '>
      <div className='h-[100vh] flex items-center '>
        {/* Home hello des */}
        <div className='visblecontainer'>
          <motion.div layout className='flex flex-col justify-end'>
            <motion.div
              className={`flex ${!isOpen === true ? 'justify-center' : 'justify-right'} items-center`}
            >
              <motion.div
                layout
                layoutId='hello'
                initial={{ scale: 0.5, x: -1200, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`${!isOpen === true ? 'text-[60px] via-white mt-[40px] from-white/10  to-white/10' : 'pl-[30px] text-[16px] from-white/30  to-white/30 via-white/90 mt-[40px]'}  bg-clip-text text-transparent
              bg-gradient-to-r z-50  font-black 
                               font-[Verdana]`}
              >
                {data.Navbar.Hero.hello[lang]}
              </motion.div>
            </motion.div>

            <motion.div
              className={`flex ${!isOpen === true ? 'justify-center' : 'justify-right'} items-center mb-[30px]`}
            >
              <motion.div
                layout
                layoutId='word'
                initial={{ scale: 0.5, x: 1200, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`${!isOpen === true ? 'text-[40px] justify-center from-white/30 via-white to-white/30 ' : 'text-[20px] justify-right  invisible'} flex bg-clip-text text-transparent bg-gradient-to-r  z-50  font-black mt-[40px] 
              font-[Cambria]`}
              >
                {data.Navbar.Hero.word[lang]}
              </motion.div>
            </motion.div>

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
                    <div className='mb-[20px] w-[30%]'>
                      <WhiteLabel text='Scheme' htmlFor='scheme' />
                      <Dropdown
                        options={[
                          { value: 'neo4j+s', label: 'neo4j+s' },
                          { value: 'neo4j+s', label: 'bolt+s' },
                        ]}
                        setValue={setScheme}
                      />
                    </div>

                    <div className='mb-5 w-[70%]'>
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
                        required={true}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        delay={0.2}
                      />
                    </div>
                  </div>
                  <div className='mb-5'>
                    <WhiteLabel text='Database user' htmlFor='username' />
                    <GrayInput
                      type='text'
                      id='username'
                      required={true}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      delay={0.4}
                    />
                  </div>

                  <div className='mb-5'>
                    <WhiteLabel text='Password' htmlFor='password' />
                    <GrayInput
                      type='password'
                      id='password'
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      delay={0.6}
                    />
                  </div>
                </motion.div>
              </div>
            )}
            <motion.div className='flex items-center justify-center '>
              <motion.div
                layout
                className='w-[500px] flex justify-center items-center place-items-center text-center gap-x-24 pt-[50px]'
              >
                <motion.button
                  layout
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ animationDelay: '0.4s' }}
                  className={` ${!isOpen ? 'w-[70%]' : ` ${loading ? 'w-[30%]' : 'w-[50%]'} `}  h-[60px] flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl  bg-sky-900 px-10 py-6
                  font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300  `}
                >
                  {isOpen && (
                    <i className={'fi  mr-6 pt-2 fi fi-br-cross '}></i>
                  )}
                  {!isOpen && (
                    <i className={'fi  mr-6 pt-2 fi fi-rr-link '}></i>
                  )}
                  {!isOpen ? 'Config your graph' : 'Cancel'}
                </motion.button>
                <motion.button
                  layout
                  onClick={() =>
                    isOpen ?
                      scheme && url && userName && password && handleLogin()
                    : sample()
                  }
                  style={{ animationDelay: '0.6s' }}
                  className={` ${!isOpen ? `${loading ? 'w-[70%]' : 'w-[30%]'} ` : ` ${loading ? 'w-[70%]' : 'w-[50%]'}`}  h-[60px] ${!isOpen || (scheme && url && userName && password) ? 'bg-sky-900 hover:bg-sky-700 hover:w-[70%]' : 'bg-gray-400 cursor-not-allowed'}  flex justify-center items-center animate__animated animate__fadeInUp rounded-full text-3xl   px-10 py-6
                  font-semibold text-white shadow-sm  hover:text-white focus-visible:outline
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05] transition-all duration-300 `}
                >
                  {!loading && (
                    <i
                      className={`fi  mr-6 pt-3 ${isOpen ? 'fi-rr-link' : 'fi-rr-play'} `}
                    ></i>
                  )}
                  {!loading && (isOpen ? 'Connect' : 'Try')}
                  {loading && <Loading />}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return <div className=''>{Welcome}</div>;
}

export default Welcome;
