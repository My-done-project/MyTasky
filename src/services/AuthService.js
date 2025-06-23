import api from '../api/api';

// 👉 POST ke /login
export const login = (data) => api.post('login', data);

// 👉 POST ke /register
export const register = (data) => api.post('register', data);

// 👉 POST ke /logout, pakai token
export const logout = (token) => {
  return api.post(
    'logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
