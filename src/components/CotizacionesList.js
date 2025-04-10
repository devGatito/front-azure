import React, { useState, useEffect } from 'react';
import { getCotizaciones } from '../services/cotizacionesService';

const CotizacionesList = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const data = await getCotizaciones();
        setCotizaciones(data);
      } catch (err) {
        setError('Error al obtener cotizaciones');
      }
    };

    fetchCotizaciones();
  }, []);

  return (
    <div>
      <h2>Cotizaciones</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map(cotizacion => (
            <tr key={cotizacion.idCotizacion}>
              <td>{cotizacion.idCotizacion}</td>
              <td>{cotizacion.total}</td>
              <td>{cotizacion.estado}</td>
              <td>
                <button className="btn btn-info">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CotizacionesList;
