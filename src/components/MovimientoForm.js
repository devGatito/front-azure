// src/components/admin/MovimientoForm.js
import React, { useState } from 'react';
import { createMovimiento } from '../services/movimientos.service';

const MovimientoForm = ({ onFormSubmit }) => {
  const [movimiento, setMovimiento] = useState({
    idProducto: '',
    tipo: '',
    cantidad: 0,
    observacion: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovimiento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovimiento(movimiento);
      onFormSubmit();
    } catch (err) {
      setError('Error al registrar el movimiento');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Registrar Movimiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Producto ID</label>
          <input
            type="number"
            name="idProducto"
            value={movimiento.idProducto}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <select
            name="tipo"
            value={movimiento.tipo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecciona tipo</option>
            <option value="ENTRADA">Entrada</option>
            <option value="SALIDA">Salida</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={movimiento.cantidad}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Observación</label>
          <textarea
            name="observacion"
            value={movimiento.observacion}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar Movimiento
        </button>
      </form>
    </div>
  );
};

export default MovimientoForm;
