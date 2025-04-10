import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    contrasena: ''
  });
  const [error, setError] = useState({ message: '', details: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ message: '', details: null });

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/registrar',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 // 10 segundos de timeout
        }
      );

      if (response.data.success) {
        alert(`Registro exitoso! ID de usuario: ${response.data.userId}`);
        navigate('/login');
      } else {
        setError({
          message: response.data.msg || 'Error en el registro',
          details: response.data.details
        });
      }
    } catch (err) {
      console.error('Error en registro:', err);
      
      let errorMessage = 'Error al conectar con el servidor';
      let errorDetails = null;

      if (err.response) {
        // Error con respuesta del servidor
        errorMessage = err.response.data.msg || errorMessage;
        errorDetails = err.response.data.details;
      } else if (err.request) {
        // La solicitud fue hecha pero no hubo respuesta
        errorMessage = 'El servidor no respondió';
      }

      setError({ message: errorMessage, details: errorDetails });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      
      {error.message && (
        <div className="error-message">
          <p>{error.message}</p>
          {error.details && (
            <ul className="error-details">
              {Object.entries(error.details).map(([field, msg]) => (
                msg && <li key={field}>{`${field}: ${msg}`}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Cédula</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;