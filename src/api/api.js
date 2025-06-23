import axios from 'axios';
import { BASE_URL } from '../config/constants';

// Buat instance axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor kalau mau pasang token otomatis nanti
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
