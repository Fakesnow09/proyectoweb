// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user'); // Puedes adaptar esta lógica

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
