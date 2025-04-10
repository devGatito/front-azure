import React, { useState, useEffect } from 'react';
import { getClientes, deleteCliente } from '../../services/clientService';

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState('');

  // Cargar los clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        setError('Error al cargar clientes');
      }
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente.idCliente !== id));
    } catch (error) {
      setError('Error al eliminar cliente');
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.idCliente}>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>
                <button onClick={() => handleDelete(cliente.idCliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
