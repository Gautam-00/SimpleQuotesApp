// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  ALL_QUOTES: `${API_BASE_URL}/allQuotes`,
  ADD_QUOTE: `${API_BASE_URL}/addQuotes`,
  GET_QUOTE: (id) => `${API_BASE_URL}/quotes/${id}`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_ENDPOINTS;
