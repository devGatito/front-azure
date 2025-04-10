import axios from 'axios';

// URL base para las peticiones
const API_URL = 'http://localhost:3000/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

// Crear un cliente
export const createCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes', clienteData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};

// Actualizar un cliente
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};
