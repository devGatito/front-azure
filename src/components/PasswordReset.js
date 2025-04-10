// src/components/PasswordReset.js
import React, { useState } from 'react';
import { resetPassword } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await resetPassword(email);
      setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña');
    } catch (err) {
      setError(err.message || 'Error al solicitar recuperación de contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset">
      <h2>Recuperar Contraseña</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Instrucciones'}
        </button>
        
        <button 
          type="button" 
          className="btn btn-link"
          onClick={() => navigate('/login')}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;