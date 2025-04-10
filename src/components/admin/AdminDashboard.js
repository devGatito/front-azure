import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, createUser, updateUser, deleteUser, updateUserRole } from '../../services/userService';
import UserList from './UserList';
import UserForm from './UserForm';
import RoleManagement from './RoleManagement';
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Verificar si el usuario tiene token y rol ADMIN
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // Redirigir si no hay token o el rol no es ADMIN
    if (!token || userRole !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data); // Suponiendo que getUsers devuelve un array de usuarios
      } catch (err) {
        setError(err.message || 'Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Crear usuario
  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);  // Añadir el nuevo usuario al estado
      return true;
    } catch (error) {
      setError(error.message || 'Error al crear usuario');
      return false;
    }
  };

  // Actualizar usuario
  const handleUpdateUser = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers(users.map(user => user.idUsuario === userId ? updatedUser : user)); // Actualizar el usuario en la lista
      setSelectedUser(null); // Limpiar el usuario seleccionado
      return true;
    } catch (error) {
      setError(error.message || 'Error al actualizar usuario');
      return false;
    }
  };

  // Eliminar usuario
  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error('El ID del usuario es inválido o está indefinido.');
      return;
    }
    
    try {
      console.log(`Eliminando usuario con ID: ${userId}`);
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId)); // Eliminar el usuario de la lista
    } catch (error) {
      setError(error.message || 'Error al eliminar usuario');
    }
  };
  
  

  // Actualizar rol de usuario
  const handleRoleUpdate = async (userId, role) => {
    try {
      const updatedUser = await updateUserRole(userId, role);
      setUsers(users.map(user => user.idUsuario === userId ? updatedUser : user)); // Actualizar el rol del usuario
    } catch (error) {
      setError(error.message || 'Error al actualizar rol');
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <div className="row">
        <div className="col-md-6">
          <Outlet />
          <h2>Gestión de Usuarios</h2>
          <UserForm 
            user={selectedUser} 
            onCreate={handleCreateUser} 
            onUpdate={handleUpdateUser} 
          />
          <UserList 
            users={users} 
            onEdit={setSelectedUser} 
            onDelete={handleDeleteUser} 
          />
        </div>

        <div className="col-md-6">
          <h2>Gestión de Roles</h2>
          <RoleManagement 
            users={users} 
            onRoleUpdate={handleRoleUpdate} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
