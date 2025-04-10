// src/components/admin/MovimientosList.js
import React, { useEffect, useState } from 'react';
import { getMovimientos } from '../../services/movimientos.service';

const MovimientosList = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const data = await getMovimientos();
        setMovimientos(data);
      } catch (err) {
        setError('Error al cargar movimientos');
      }
    };

    fetchMovimientos();
  }, []);

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Lista de Movimientos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Observación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
            <tr key={movimiento.idMovimiento}>
              <td>{movimiento.nombre}</td>
              <td>{movimiento.tipo}</td>
              <td>{movimiento.cantidad}</td>
              <td>{movimiento.observacion}</td>
              <td>{new Date(movimiento.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovimientosList;
