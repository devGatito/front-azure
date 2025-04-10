// src/services/devolucionesService.js
import axios from 'axios';

// URL base para el backend
const API_URL = 'http://localhost:3000/api/devoluciones';

// Configuración de axios para incluir el token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear una nueva devolución
export const createReturn = async (returnData) => {
  try {
    const response = await api.post('/', returnData);
    return response.data;
  } catch (error) {
    console.error("Error al crear devolución:", error);
    throw error.response?.data || error;
  }
};

// Obtener todas las devoluciones
export const getReturns = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener devoluciones:", error);
    throw error.response?.data || error;
  }
};

// Obtener una devolución por ID
export const getReturnById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener devolución:", error);
    throw error.response?.data || error;
  }
};
