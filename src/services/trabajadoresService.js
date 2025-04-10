import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configuración de axios
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

// Obtener todos los trabajadores
export const getTrabajadores = async () => {
  try {
    const response = await api.get('/trabajadores');
    return response.data || [];
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
    throw error.response?.data || error;
  }
};

// Crear un nuevo trabajador
export const createTrabajador = async (trabajadorData) => {
  try {
    const response = await api.post('/trabajadores', trabajadorData);
    return response.data;
  } catch (error) {
    console.error("Error al crear trabajador:", error);
    throw error.response?.data || error;
  }
};

// Actualizar datos de un trabajador
export const updateTrabajador = async (trabajadorId, trabajadorData) => {
  try {
    const response = await api.put(`/trabajadores/${trabajadorId}`, trabajadorData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar trabajador:", error);
    throw error.response?.data || error;
  }
};

// Eliminar un trabajador
export const deleteTrabajador = async (trabajadorId) => {
  try {
    const response = await api.delete(`/trabajadores/${trabajadorId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar trabajador:", error);
    throw error.response?.data || error;
  }
};
