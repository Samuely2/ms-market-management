import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/sellers', {
      name: userData.name,
      cnpj: userData.cnpj,
      phone: userData.phone,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro no cadastro' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao fazer login' };
  }
};
export const activateAccount = async (code) => {
    try {
      const response = await api.post('/activate', { activation_code: code });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao ativar conta' };
    }
  };
  
  export const resendActivationCode = async (email) => {
    try {
      const response = await api.post('/resend-activation', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao reenviar código' };
    }
  };