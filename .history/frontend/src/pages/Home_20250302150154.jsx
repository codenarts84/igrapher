/** @format */

import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Welcome from '../component/welcome/Welocome';
import { motion } from 'framer-motion';
import BG from '../component/hoBG';

function Home() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');

  //   if (isLoggedIn) {
  //     navigate('/newgraph');
  //   }
  // }, [navigate]);
  return (
    <motion.div
      layout
      layoutId='Query'
      className='w-full h-full overflow-hidden'
    >
      <Navbar />
      <motion.div
        className='fixed top-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed bg-cover bottle-0 '
        // style={{
        //   backgroundImage:
        //     'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExam8xYXh3Mmw0bTlsY2lpaDdleWZpcWo5Y3gxN294djR2bmtsZmxwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KX5nwoDX97AtPvKBF6/giphy.gif)'
        // }}
      >
        <motion.div
          layout
          layoutId='BG'
          className='fixed w-full h-full overflow-hidden'
        >
          <BG />
        </motion.div>
        {/* <Welcome /> */}
      </motion.div>
    </motion.div>
  );
}

export default Home;
