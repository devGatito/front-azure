// src/services/productos.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos';

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

export const getProductos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const createProducto = async (productoData) => {
  try {
    const response = await api.post('/', productoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const response = await api.put(`/${id}`, productoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
