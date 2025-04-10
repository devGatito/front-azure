import React, { useState } from 'react';
import { createCliente, updateCliente } from '../../services/clientService';

const ClientForm = ({ selectedClient, onFormSubmit }) => {
  const [nombre, setNombre] = useState(selectedClient ? selectedClient.nombre : '');
  const [correo, setCorreo] = useState(selectedClient ? selectedClient.correo : '');
  const [telefono, setTelefono] = useState(selectedClient ? selectedClient.telefono : '');
  const [direccion, setDireccion] = useState(selectedClient ? selectedClient.direccion : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteData = { nombre, correo, telefono, direccion };

    try {
      if (selectedClient) {
        await updateCliente(selectedClient.idCliente, clienteData);
      } else {
        await createCliente(clienteData);
      }
      onFormSubmit();
    } catch (error) {
      setError('Error al guardar el cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedClient ? 'Actualizar Cliente' : 'Crear Cliente'}</h2>
      {error && <div>{error}</div>}
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      </div>
      <div>
        <label>Dirección:</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClientForm;
