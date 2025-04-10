// src/Clientes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto si tu backend está en otro puerto

const Clientes = () => {
  const [clientes, setClientes] = useState([]);  // Estado para almacenar los clientes
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos

  // Efecto para hacer la solicitud HTTP cuando el componente se monte
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${API_URL}/clientes`);
        console.log('Clientes recibidos:', response.data); // Verifica la respuesta
        setClientes(response.data.data);  // Accede a la propiedad 'data' que contiene el arreglo de clientes
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
        setLoading(false);
      }
    };
    
  
    fetchClientes(); 
  }, []); 
  
  // Muestra un mensaje mientras los datos se están cargando
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Muestra la lista de clientes una vez que los datos se han cargado
  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nombre}</li>  // Muestra el nombre de cada cliente
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
