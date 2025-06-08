import api from './api';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const toggleStatus = async (id) => {
  const response = await api.patch(`/products/${id}/toggle-status`);
  return response.data;
};

export const sellProduct = async (productId, quantity) => {
  try {
    const response = await api.post(`/products/${productId}/sell/${quantity}`);
    return {
      success: true,
      data: response.data,
      remainingStock: response.data.remaining_stock || response.data.new_quantity
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao processar venda'
    };
  }
};

export const copyProduct = async (id) => {
  const response = await api.post(`/products/${id}/copy`);
  return response.data;
};