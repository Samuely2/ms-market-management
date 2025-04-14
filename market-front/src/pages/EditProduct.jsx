import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/editProduct.css'; // Importe o novo CSS

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
      <main className="edit-product-page">
        <div className="edit-product-container">
          <div className="edit-product-header">
            <h1 className="edit-product-title">Editar Produto</h1>
            <div className="edit-product-actions">
              <Link to={`/products/${id}`} className="detail-btn">
                Voltar para detalhes
              </Link>
            </div>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {product && (
            <div className="edit-product-card">
              <ProductForm 
                product={product} 
                onSubmit={handleSubmit} 
                loading={loading}
                formClassName="edit-product-form"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default EditProduct;