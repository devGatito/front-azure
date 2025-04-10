// src/services/ventasService.js
import axios from 'axios';

// Nueva URL base para el backend
const API_URL = 'http://localhost:3000/api/ventas';

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

// Crear una nueva venta
export const createSale = async (saleData) => {
  try {
    const response = await api.post('/', saleData);
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
    throw error.response?.data || error;
  }
};

// Obtener todas las ventas
export const getSales = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error.response?.data || error;
  }
};

// Obtener una venta por ID
export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener venta:", error);
    throw error.response?.data || error;
  }
};
