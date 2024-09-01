import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addFavorite = async (movieId) => {
  try {
    const response = await axios.post(`${API_URL}/favorites/add`, { movieId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const response = await axios.post(`${API_URL}/favorites/remove`, { movieId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};