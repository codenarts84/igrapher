/** @format */

// import React from 'react';
// import data from '../Datebase.json';
// import { useLanguage } from '../help/helpFunction';
// import { motion } from 'framer-motion';
// import { useAppContext } from '../help/ContextManager';

// function Welcome () {
//   const lang = useLanguage();
//   const { graphData } = useAppContext();
//   console.log('graph data in welcome', graphData);
//   const Welcome = (
//     <div className="flex items-center justify-center ">
//       <div className="h-[100vh] flex items-center ">
//         {/* Home hello des */}
//         <div className="visblecontainer">
//           <div className="flex flex-col justify-end">
//             <motion.h1
//               layout
//               initial={{ opacity: 0, scale: 0.8, x: -1200 }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 x: 0,
//                 transition: { duration: 0.7, delay: 0.4 }
//               }}
//               exit={{ opacity: 0 }}
//               className="from-white/70 to-white/70 bg-clip-text text-transparent bg-gradient-to-r text-right animate__animated animate__slideInLeft font-black  text-[35px] md:text-[50px] font-[Verdana] font-[] z-50 lg:text-9xl"
//             >
//               {data.Navbar.Hero.hello[lang]}
//             </motion.h1>
//             <motion.h2
//               layout
//               initial={{ opacity: 0, scale: 0.5, x: 1200 }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 x: 0,
//                 transition: { duration: 0.7, delay: 0.4 }
//               }}
//               exit={{ opacity: 0 }}
//               className="from-sky-100/50 to-sky-200/50 bg-clip-text text-transparent bg-gradient-to-r z-50  text-right animate__animated animate__slideInRight lg:text-[30px] font-[Cambria] p-[20px]"
//             >
//               {data.Navbar.Hero.word[lang]}
//             </motion.h2>
//             <div className="flex items-center justify-center mt-10 place-items-center gap-x-24">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 whileFocus={{ scale: 1 }}
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <motion.a
//                   layoutId="newGraph"
//                   href={Message.btn1web}
//                   style={{ animationDelay: '0.4s' }}
//                   className="animate__animated animate__fadeInUp rounded-lg text-3xl  bg-sky-900 px-10 py-6 font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-[1.05]"
//                 >
//                   <i className={`fi  mr-6 mt-3 ${Message.btn1Icon} `}></i>
//                   {Message.btn1[lang]}
//                 </motion.a>
//               </motion.div>
//               <a
//                 href={Message.btn2web}
//                 style={{ animationDelay: '0.6s' }}
//                 className="animate__animated animate__fadeInUp text-3xl  font-semibold text-gray-200 hover:text-white hover:scale-[1.05]"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   whileFocus={{ scale: 1 }}
//                   initial={{ scale: 0.5, y: '30px', opacity: 0 }}
//                   animate={{ scale: 1, y: '0px', opacity: 1 }}
//                   transition={{ duration: 0.9 }}
//                 >
//                   <i className={`fi  mr-6 mt-3 ${Message.btn2Icon} `}></i>
//                   {Message.btn2[lang]} →
//                 </motion.div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return <div className="">{Welcome}</div>;
// }

// export default Welcome;
