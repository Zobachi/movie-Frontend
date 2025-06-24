// client/src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'REACT_APP_API_URL', // Update to your backend URL if deployed
});

// Attach JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----- FAVORITES -----
export const addFavorite = (movie) => API.post('/movies/favorites', { movie });
export const removeFavorite = (movieId) => API.delete(`/movies/favorites/${movieId}`);

// ----- WATCHLIST -----
export const addWatchlist = (movie) => API.post('/movies/watchlist', { movie });
export const removeWatchlist = (movieId) => API.delete(`/movies/watchlist/${movieId}`);

export default API;
