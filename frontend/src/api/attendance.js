import api, { withAuth } from '../axiosConfig';
export const checkIn =  (token) => api.post('/attendance/checkin', {}, withAuth(token));
export const checkOut = (token) => api.post('/attendance/checkout', {}, withAuth(token));
export const getHistory = (token, params) => api.get('/attendance/history', { ...withAuth(token), params });