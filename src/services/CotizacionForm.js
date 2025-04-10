import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCotizacion, getCotizacionById, updateCotizacionStatus } from '../services/cotizacionesService';

const CotizacionForm = () => {
  const [cotizacion, setCotizacion] = useState({
    idCliente: '',
    total: '',
    estado: 'PENDIENTE',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCotizacion = async () => {
        try {
          const data = await getCotizacionById(id);
          setCotizacion(data);
        } catch (err) {
          setError('Error al obtener cotización');
        }
      };

      fetchCotizacion();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCotizacionStatus(id, cotizacion.estado);
      } else {
        await createCotizacion(cotizacion);
      }
      navigate('/admin/cotizaciones');
    } catch (err) {
      setError('Error al guardar cotización');
    }
  };

  const handleChange = (e) => {
    setCotizacion({ ...cotizacion, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{id ? 'Editar Cotización' : 'Crear Cotización'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente ID:</label>
          <input type="number" name="idCliente" value={cotizacion.idCliente} onChange={handleChange} required />
        </div>
        <div>
          <label>Total:</label>
          <input type="number" name="total" value={cotizacion.total} onChange={handleChange} required />
        </div>
        <div>
          <label>Estado:</label>
          <select name="estado" value={cotizacion.estado} onChange={handleChange}>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="APROBADO">APROBADO</option>
            <option value="RECHAZADO">RECHAZADO</option>
          </select>
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'} Cotización</button>
      </form>
    </div>
  );
};

export default CotizacionForm;
