import React, { useState, useEffect } from 'react';
import { getTrabajadores, deleteTrabajador } from '../services/trabajadoresService';

const TrabajadoresList = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar los trabajadores cuando el componente se monta
  useEffect(() => {
    const fetchTrabajadores = async () => {
      setLoading(true);
      try {
        const data = await getTrabajadores();
        setTrabajadores(data);
      } catch (err) {
        setError('Error al cargar trabajadores');
      } finally {
        setLoading(false);
      }
    };

    fetchTrabajadores();
  }, []);

  // Eliminar un trabajador
  const handleDelete = async (id) => {
    try {
      await deleteTrabajador(id);
      setTrabajadores(trabajadores.filter(trabajador => trabajador.idTrabajador !== id));
    } catch (err) {
      setError('Error al eliminar trabajador');
    }
  };

  if (loading) return <div>Cargando trabajadores...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="trabajadores-list">
      <h2>Listado de Trabajadores</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador) => (
            <tr key={trabajador.idTrabajador}>
              <td>{trabajador.nombre}</td>
              <td>{trabajador.puesto}</td>
              <td>{trabajador.telefono}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(trabajador.idTrabajador)}>
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

export default TrabajadoresList;
