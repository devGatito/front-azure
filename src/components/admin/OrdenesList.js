// src/components/admin/OrdenesList.js
import React, { useEffect, useState } from 'react';
import { getOrdenes, deleteOrden } from '../../services/ordenes.service';

const OrdenesList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await getOrdenes();
        setOrdenes(data);
      } catch (err) {
        setError('Error al cargar órdenes');
      }
    };

    fetchOrdenes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrden(id);
      setOrdenes(ordenes.filter((orden) => orden.idOrden !== id));
    } catch (err) {
      setError('Error al eliminar orden');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Lista de Órdenes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Placas</th>
            <th>Cliente</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.idOrden}>
              <td>{orden.placas}</td>
              <td>{orden.cliente}</td>
              <td>{orden.descripcion}</td>
              <td>{orden.estado}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(orden.idOrden)}>
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

export default OrdenesList;
