// src/components/admin/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onCreate, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'user'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        password: '',
        rol: user.rol || 'user'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(user._id, formData);
    } else {
      onCreate(formData);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: 'user'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          className="form-control"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required={!user}
        />
      </div>
      
      <div className="form-group">
        <label>Rol</label>
        <select
          name="rol"
          className="form-control"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="admin">Administrador</option>
          <option value="mecanico">Mecánico</option>
          <option value="gerente">Gerente</option>
          <option value="user">Usuario</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-success">
        {user ? 'Actualizar Usuario' : 'Crear Usuario'}
      </button>
    </form>
  );
};

export default UserForm;    