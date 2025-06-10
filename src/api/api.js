import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:8000/api', // ganti pakai IP laptop kamu ya!
  timeout: 5000,
});

export default api;
