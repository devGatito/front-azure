// src/services/movimientos.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/movimientos';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMovimientos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    throw error;
  }
};

export const createMovimiento = async (movimientoData) => {
  try {
    const response = await api.post('/', movimientoData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar movimiento:", error);
    throw error;
  }
};

export const getHistorialPorProducto = async (id) => {
  try {
    const response = await api.get(`/producto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de movimientos por producto:", error);
    throw error;
  }
};
