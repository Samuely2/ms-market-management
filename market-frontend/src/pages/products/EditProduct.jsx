import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { productService } from '../../services/productService';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await productService.getById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (productData) => {
    setLoading(true);
    try {
      await productService.update(id, productData);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Editar Produto</h2>
      <ProductForm 
        product={product} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
}