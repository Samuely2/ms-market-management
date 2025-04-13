import React from 'react';
import ProductForm from './ProductForm';
import { productService } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (productData) => {
    setLoading(true);
    try {
      await productService.create(productData);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Produto</h2>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}