import React, { useState } from 'react';
import ClientList from './ClientList';
import ClientForm from './ClientForm';

const AdminCliente = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleEdit = (client) => {
    setSelectedClient(client);
  };

  const handleFormSubmit = () => {
    setSelectedClient(null); // Resetea el cliente seleccionado después de enviar el formulario
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <ClientForm selectedClient={selectedClient} onFormSubmit={handleFormSubmit} />
      <ClientList onEdit={handleEdit} />
    </div>
  );
};

export default AdminCliente;
