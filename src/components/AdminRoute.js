import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Asegúrate de que 'userRole' sea 'ADMIN'

  // Depuración: Verifica los valores en consola
  console.log("Token:", token);
  console.log("UserRole:", userRole);
  
  if (!token) {
    console.log("No hay token, redirigiendo a /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (userRole !== 'ADMIN') {
    console.log("Usuario no es ADMIN, redirigiendo a /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("Acceso concedido a ruta admin");
  return children; // Permite acceder a la ruta protegida si el rol es ADMIN
};

export default AdminRoute;
