// src/components/admin/UserList.js
import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  if (!users || !Array.isArray(users)) {
    users = [];
  }

  return (
    <div className="user-list">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUsuario}> {/* Asegúrate de usar idUsuario como key */}
              <td>{user.nombre_usuario} {/* Cambié 'nombre' por 'nombre_usuario' */}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => onEdit(user)} 
                >
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(user.idUsuario)} 
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
