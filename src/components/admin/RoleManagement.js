// src/components/admin/RoleManagement.js
import React, { useState } from 'react';

const RoleManagement = ({ users, onRoleUpdate }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');

  const handleRoleUpdate = (e) => {
    e.preventDefault();
    if (selectedUserId) {
      onRoleUpdate(selectedUserId, selectedRole);
      setSelectedUserId('');
    }
  };

  return (
    <div className="role-management">
      <form onSubmit={handleRoleUpdate}>
        <div className="form-group">
         
          
        </div>
        
        <div className="form-group">
          <label>Nuevo Rol</label>
          <select
            className="form-control"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="admin">Administrador</option>
            <option value="mecanico">Mecánico</option>
            <option value="gerente">Gerente</option>
            <option value="user">Usuario</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Actualizar Rol
        </button>
      </form>
    </div>
  );
};

export default RoleManagement;