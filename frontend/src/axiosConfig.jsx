import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
