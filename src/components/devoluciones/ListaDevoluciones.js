// src/components/devoluciones/ListaDevoluciones.js
import React, { useEffect, useState } from 'react';
import { getReturns } from '../../services/devolucionesService';

const ListaDevoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevoluciones = async () => {
      try {
        const data = await getReturns();
        setDevoluciones(data);
      } catch (err) {
        setError("Error al cargar las devoluciones");
      } finally {
        setLoading(false);
      }
    };

    fetchDevoluciones();
  }, []);

  if (loading) return <div>Cargando devoluciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Devoluciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID Devolución</th>
            <th>ID Venta</th>
            <th>Motivo</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {devoluciones.map((devolucion) => (
            <tr key={devolucion.idDevolucion}>
              <td>{devolucion.idDevolucion}</td>
              <td>{devolucion.idVenta}</td>
              <td>{devolucion.motivo}</td>
              <td>{devolucion.cantidad}</td>
              <td>{devolucion.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDevoluciones;
