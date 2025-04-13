import api from './api';

export const productService = {
  async list() {
    const response = await api.get('/products');
    return response.data;
  },
  
  async create(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  async getById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  async toggleStatus(id) {
    const response = await api.patch(`/products/${id}/toggle-status`);
    return response.data;
  },
  
  async sellProduct(id, quantity) {
    const response = await api.post(`/products/${id}/sell`, { quantity });
    return response.data;
  }
};