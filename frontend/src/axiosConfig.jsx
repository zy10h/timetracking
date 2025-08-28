import axios from 'axios';

const baseURL = 'http://13.236.193.162:5001/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
