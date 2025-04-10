// src/components/admin/OrdenForm.js
import React, { useState, useEffect } from 'react';
import { createOrden, updateOrdenState, getOrdenById } from '../../services/ordenes.service';
import { useParams, useNavigate } from 'react-router-dom';

const OrdenForm = () => {
  const [orden, setOrden] = useState({
    idVehiculo: '',
    descripcion: '',
    estado: 'RECEPCION',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchOrden = async () => {
        try {
          const data = await getOrdenById(id);
          setOrden(data);
        } catch (err) {
          setError('Error al obtener la orden');
        }
      };

      fetchOrden();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrden((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateOrdenState(id, orden.estado);
      } else {
        await createOrden(orden);
      }
      navigate('/admin/ordenes');
    } catch (err) {
      setError('Error al registrar o actualizar la orden');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>{id ? 'Actualizar Orden' : 'Registrar Orden'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={orden.descripcion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={orden.estado}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="RECEPCION">Recepción</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="FINALIZADA">Finalizada</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar' : 'Registrar'} Orden
        </button>
      </form>
    </div>
  );
};

export default OrdenForm;
