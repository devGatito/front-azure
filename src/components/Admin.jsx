// src/components/admin/AdminDashboard.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TrabajadoresList from './TrabajadoresList';
import TrabajadoresForm from './TrabajadoresForm';

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>

      {/* Enlace para navegar a la lista de trabajadores o crear nuevo trabajador */}
      <nav>
        <Link to="/admin/trabajadores">Ver Trabajadores</Link>
        <Link to="/admin/trabajadores/crear">Crear Trabajador</Link>
      </nav>

      {/* Definir las rutas de los componentes */}
      <Routes>
        <Route path="/admin/trabajadores" element={<TrabajadoresList />} />
        <Route path="/admin/trabajadores/crear" element={<TrabajadoresForm />} />
      </Routes>
    </div>
  );
};

export default Admin;
