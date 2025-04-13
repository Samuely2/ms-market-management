import api from './api'

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao fazer login' }
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/sellers', userData)
    return response.data
  } catch (error) {
    throw error.response?.data || { error: 'Erro no cadastro' }
  }
}