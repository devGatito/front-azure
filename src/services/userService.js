import axios from 'axios';

// Nueva URL base para el backend
const API_URL = 'http://localhost:3000/api';

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

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');  // URL actualizada
    return response.data || [];  // Asegúrate de devolver un array vacío si no hay datos
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error.response?.data || error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error.response?.data || error;
  }
};

// Actualizar datos de un usuario
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/usuarios/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error.response?.data || error;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error.response?.data || error;
  }
};

// Restablecer contraseña
export const resetPassword = async (email) => {
  try {
    const response = await api.post('/usuarios/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    throw error.response?.data || error;
  }
};

// Actualizar el rol de un usuario
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/usuarios/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    throw error.response?.data || error;
  }
};
