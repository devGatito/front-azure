// src/components/admin/VehiculosList.js
import React, { useEffect, useState } from 'react';
import { getVehiculos, deleteVehiculo } from '../../services/vehiculos.service';

const VehiculosList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const data = await getVehiculos();
        setVehiculos(data);
      } catch (err) {
        setError('Error al cargar vehículos');
      }
    };

    fetchVehiculos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteVehiculo(id);
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.idVehiculo !== id));
    } catch (err) {
      setError('Error al eliminar vehículo');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Lista de Vehículos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Placas</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.idVehiculo}>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.anio}</td>
              <td>{vehiculo.placas}</td>
              <td>{vehiculo.color}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(vehiculo.idVehiculo)}>
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

export default VehiculosList;
