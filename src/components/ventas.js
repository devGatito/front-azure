// src/components/ventas/ListaVentas.js
import React, { useEffect, useState } from 'react';
import { getSales } from '../services/ventasService';

const ListaVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const data = await getSales();
        setVentas(data);
      } catch (err) {
        setError("Error al cargar las ventas");
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  if (loading) return <div>Cargando ventas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Cotización</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.idVenta}>
              <td>{venta.idVenta}</td>
              <td>{venta.idCliente}</td> {/* Suponiendo que solo estás mostrando el id del cliente, puedes modificarlo si necesitas más detalles */}
              <td>{venta.idCotizacion}</td>
              <td>{venta.total}</td>
              <td>{venta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaVentas;
