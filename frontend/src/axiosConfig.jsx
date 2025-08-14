import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.252.214.233:5001', // local
  //baseURL: 'http://54.252.214.233:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
