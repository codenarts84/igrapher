/** @format */

import React from 'react';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async (e) => {
    e.preventDefault();

    // setLoading(true);
    setTimeout(() => {
      navigate('/newgraph');
      // setLoading(false);
    }, 500);
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <section
        id='login'
        className='z-50 w-full ease-in-out bg-gray-50 dark:bg-gray-900 f-full'
      >
        <img
          src='https://a0.muscache.com/im/pictures/6481d1e8-a4d9-4f24-99e7-efccefb9132d.jpg?im_w=1200'
          className='absolute object-cover w-full h-full'
        ></img>
        <div className='absolute inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 glass-effect'>
          <div className='flex flex-col items-center justify-center mx-8 bg-white rounded-lg shadow sm:mx-4 lg:py-0'>
            <div className='flex items-center justify-between duration-700 ease-in-out shadow'>
              <img
                src='https://a0.muscache.com/im/pictures/6481d1e8-a4d9-4f24-99e7-efccefb9132d.jpg?im_w=1200'
                className='object-cover h-full rounded-l-lg w-52 hide-on-small-screen'
              ></img>
              <div className='flex flex-col w-96'>
                <div className='flex items-center justify-center w-full'>
                  <Link to='/' className='flex justify-center p-8'>
                    <span className='mr-2 logo vertical-center'>
                      <i className='fi fi-brands-airbnb' />
                    </span>
                    <h1>
                      <span className='self-center text-4xl font-semibold text-transparent vertical-center hide-on-small-screen sm:text-2xl whitespace-nowrap dark:text-white bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
                        AirBrB
                      </span>
                    </h1>
                  </Link>
                </div>
                <div className='w-full dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                  <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h5 className='flex justify-start text-xl font-bold leading-tight tracking-tight text-gray-400 dark:text-white'>
                      Login now
                    </h5>
                    <form className='space-y-4 md:space-y-6'>
                      <div>
                        <label
                          htmlFor='loginEmail'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Account
                        </label>
                        <input
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='email'
                          required=''
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='loginPassword'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Password
                        </label>
                        <div className=''>
                          <form className='flex items-center w-full'>
                            <div className='relative w-full'>
                              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'></div>
                              <input
                                type={visible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='pr- bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              ></input>
                              <div
                                type='button'
                                className='absolute inset-y-0 right-0 flex items-center pr-3'
                              >
                                <div onClick={handleChange}>
                                  {visible ?
                                    <EyeIcon />
                                  : <EyeSlashIcon />}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            aria-describedby='terms'
                            type='checkbox'
                            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                            required=''
                          />
                        </div>
                        <div className='mb-6 ml-3 text-sm'>
                          <label
                            htmlFor='terms'
                            className='font-light text-gray-500 dark:text-gray-300'
                            required=''
                          >
                            I accept the{' '}
                            <a className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={login}
                        type='submit'
                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      >
                        Login in
                      </button>
                      <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                        Do not have an account?{' '}
                        <Link
                          to='/register'
                          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        >
                          Register here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
