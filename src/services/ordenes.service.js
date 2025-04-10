// src/services/ordenes.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ordenes';

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

// Obtener todas las órdenes
export const getOrdenes = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    throw error;
  }
};

// Crear una nueva orden
export const createOrden = async (ordenData) => {
  try {
    const response = await api.post('/', ordenData);
    return response.data;
  } catch (error) {
    console.error("Error al crear orden:", error);
    throw error;
  }
};

// Obtener una orden por ID
export const getOrdenById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener orden por ID:", error);
    throw error;
  }
};

// Actualizar el estado de una orden
export const updateOrdenState = async (id, estado) => {
  try {
    const response = await api.put(`/${id}/estado`, { estado });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estado de orden:", error);
    throw error;
  }
};

// Eliminar una orden
export const deleteOrden = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar orden:", error);
    throw error;
  }
};
