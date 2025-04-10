// src/components/devoluciones/DevolucionForm.js
import React, { useState } from 'react';
import { createReturn } from '../../services/devolucionesService';

const DevolucionForm = ({ onFormSubmit }) => {
  const [idVenta, setIdVenta] = useState('');
  const [motivo, setMotivo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const returnData = { idVenta, motivo, cantidad, total };
      await createReturn(returnData);
      onFormSubmit();  // Callback para resetear el formulario
    } catch (error) {
      setError("Error al crear la devolución");
    }
  };

  return (
    <div>
      <h2>Crear Devolución</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID Venta"
          value={idVenta}
          onChange={(e) => setIdVenta(e.target.value)}
        />
        <input
          type="text"
          placeholder="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <button type="submit">Crear Devolución</button>
      </form>
    </div>
  );
};

export default DevolucionForm;
