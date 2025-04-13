import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/sellers', userData);
  return response.data;
};

export const activateAccount = async (code) => {
  const response = await api.post('/activate', { activation_code: code });
  return response.data;
};