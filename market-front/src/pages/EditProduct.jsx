import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/products.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setError('Erro ao carregar produto');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await updateProduct(id, formData);
      navigate(`/products/${id}`);
    } catch (error) {
      setError('Erro ao atualizar produto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) return <Spinner />;

  return (
    <>
      <Header />
      <main className="product-form-page">
        <div className="container">
          <h1>Editar Produto</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          {product && (
            <ProductForm 
              product={product} 
              onSubmit={handleSubmit} 
              loading={loading}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default EditProduct;