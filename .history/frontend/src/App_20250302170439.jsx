/** @format */

import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Errorpage from './pages/Errorpage.jsx';
import GraphBoard from './pages/GraphBoard.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import GraphGrawing from './component/WholeGraph/GraphDrawing.jsx';
import { AppContextProvider } from './help/ContextManager';
import Warning from './pages/warning.jsx';
import Notify from './component/Notify.jsx';
// import ProtectedRoute from './component/ProtectRoute.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/newgraph',
    // element: <ProtectedRoute element={GraphBoard} />
    element: <GraphBoard />,
  },
  {
    path: '*',
    element: <Errorpage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/graphdrawing',
    // element: <ProtectedRoute element={GraphGrawing} />
    element: <GraphGrawing />,
  },
]);

const App = () => {
  return (
    <AppContextProvider>
      <Warning />
      <Notify />
      <RouterProvider router={router} />
    </AppContextProvider>
  );
};

export default App;
