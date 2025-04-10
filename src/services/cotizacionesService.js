import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cotizaciones'; // URL del backend

// Crear una nueva cotización
export const createCotizacion = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data; // Devuelve el mensaje y el id de la cotización
  } catch (error) {
    console.error('Error al crear cotización:', error);
    throw error.response?.data || error;
  }
};

// Obtener todas las cotizaciones
export const getCotizaciones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve todas las cotizaciones
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    throw error.response?.data || error;
  }
};

// Obtener cotización por id
export const getCotizacionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Devuelve la cotización correspondiente al id
  } catch (error) {
    console.error('Error al obtener la cotización:', error);
    throw error.response?.data || error;
  }
};

// Actualizar el estado de una cotización
export const updateCotizacionStatus = async (id, estado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/estado`, { estado });
    return response.data; // Devuelve el mensaje de éxito
  } catch (error) {
    console.error('Error al actualizar el estado de la cotización:', error);
    throw error.response?.data || error;
  }
};
