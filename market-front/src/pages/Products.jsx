import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, toggleStatus, copyProduct } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import '../styles/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleToggleStatus = async (id) => {
    const originalProducts = [...products];
    // Otimista
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: !p.status } : p
    ));
    try {
      await toggleStatus(id);
    } catch (error) {
      setProducts(originalProducts); // Reverte em caso de erro
      console.error('Erro ao alterar status:', error);
    }
  };

  const handleUpdateStock = (productId, newQuantity) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity: newQuantity } : p
    ));
  };
  
  const handleCopyProduct = async (id) => {
    try {
      // Chama a API, que retorna o produto recém-criado
      const newProduct = await copyProduct(id);
      
      // Adiciona o novo produto à lista existente, fazendo a UI atualizar imediatamente
      setProducts(currentProducts => [...currentProducts, newProduct]);
    } catch (error) {
      console.error('Erro ao copiar o produto:', error);
      // Aqui você pode adicionar um alerta ou notificação para o usuário
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <main className="products-page">
        <div className="container">
          <div className="products-header">
            <h1>Meus Produtos</h1>
            <div className="products-actions">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to="/products/new" className="new-product-btn">
                Novo Produto
              </Link>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum produto encontrado</p>
              <Link to="/products/new">Cadastre seu primeiro produto</Link>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onToggleStatus={handleToggleStatus}
                  onUpdateStock={handleUpdateStock}
                  onCopyProduct={handleCopyProduct}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Products;