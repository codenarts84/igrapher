import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Welcome from '../component/welcome/Welocome';
import { motion } from 'framer-motion';
import BG from '../component/hoBG';

function Home () {
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
      layoutId="Query"
      className="w-full h-full overflow-hidden"
    >
      <Navbar />
      <motion.div
        className="bg-fixed bg-cover left-0 top-0 bottle-0 right-0 overflow-hidden fixed w-full h-full "
        // style={{
        //   backgroundImage:
        //     'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExam8xYXh3Mmw0bTlsY2lpaDdleWZpcWo5Y3gxN294djR2bmtsZmxwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KX5nwoDX97AtPvKBF6/giphy.gif)'
        // }}
      >
        <motion.div
          layout
          layoutId="BG"
          className="fixed overflow-hidden  w-full h-full"
        >
          <BG />
        </motion.div>
        <Welcome />
      </motion.div>
    </motion.div>
  );
}

export default Home;
