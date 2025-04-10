// src/components/admin/VehiculoForm.js
import React, { useState, useEffect } from 'react';
import { createVehiculo, updateVehiculo, getVehiculoById } from '../../services/vehiculos.service';
import { useParams, useNavigate } from 'react-router-dom';

const VehiculoForm = () => {
  const [vehiculo, setVehiculo] = useState({
    idCliente: '',
    marca: '',
    modelo: '',
    anio: '',
    placas: '',
    color: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchVehiculo = async () => {
        try {
          const data = await getVehiculoById(id);
          setVehiculo(data);
        } catch (err) {
          setError('Error al obtener vehículo');
        }
      };

      fetchVehiculo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateVehiculo(id, vehiculo);
      } else {
        await createVehiculo(vehiculo);
      }
      navigate('/admin/vehiculos');
    } catch (err) {
      setError('Error al registrar o actualizar vehículo');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>{id ? 'Actualizar Vehículo' : 'Registrar Vehículo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={vehiculo.marca}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Año</label>
          <input
            type="number"
            name="anio"
            value={vehiculo.anio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Placas</label>
          <input
            type="text"
            name="placas"
            value={vehiculo.placas}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={vehiculo.color}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar' : 'Registrar'} Vehículo
        </button>
      </form>
    </div>
  );
};

export default VehiculoForm;
