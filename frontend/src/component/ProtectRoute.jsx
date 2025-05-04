import React from 'react';
import { useNavigate } from 'react-router-dom';

const navigateTo = useNavigate();

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return isLoggedIn ? <Component {...rest} /> : navigateTo('/');
};

export default ProtectedRoute;
