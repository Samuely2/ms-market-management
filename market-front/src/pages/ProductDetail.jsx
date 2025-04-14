import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/productService';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/products.css'; // Reutilizando o mesmo CSS

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (!product) return (
    <div className="empty-state">
      <p>Produto não encontrado</p>
      <Link to="/products">Voltar para lista de produtos</Link>
    </div>
  );

  return (
    <>
      <Header />
      <main className="products-page">
        <div className="container">
          <div className="products-header">
            <h1>Detalhes do Produto</h1>
            <div className="products-actions">
              <Link to={`/products/${product.id}/edit`} className="new-product-btn">
                Editar Produto
              </Link>
              <Link to="/products" className="detail-btn">
                Voltar
              </Link>
            </div>
          </div>

          <div className="product-card">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className={`stock-badge ${!product.status ? 'inactive' : ''}`}>
                  {product.status ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <div className="product-price">
                R$ {product.price.toFixed(2)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-gray-500">Estoque</h4>
                  <p>{product.quantity} unidades</p>
                </div>
                <div>
                  <h4 className="text-gray-500">Cadastrado em</h4>
                  <p>{new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {product.description && (
                <div className="mt-4">
                  <h4 className="text-gray-500">Descrição</h4>
                  <p>{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}