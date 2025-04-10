// src/services/vehiculos.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vehiculos';

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

// Obtener todos los vehículos
export const getVehiculos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    throw error;
  }
};

// Crear un nuevo vehículo
export const createVehiculo = async (vehiculoData) => {
  try {
    const response = await api.post('/', vehiculoData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar vehículo:", error);
    throw error;
  }
};

// Obtener un vehículo por ID
export const getVehiculoById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vehículo por ID:", error);
    throw error;
  }
};

// Actualizar vehículo
export const updateVehiculo = async (id, vehiculoData) => {
  try {
    const response = await api.put(`/${id}`, vehiculoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    throw error;
  }
};

// Eliminar vehículo
export const deleteVehiculo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    throw error;
  }
};
