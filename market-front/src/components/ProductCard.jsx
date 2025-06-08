import { useState } from 'react';
import { Link } from 'react-router-dom';
import SellModal from './SellModal';

const ProductCard = ({ product, onToggleStatus, onUpdateStock, onCopyProduct }) => {
  const [showSellModal, setShowSellModal] = useState(false);

  const handleSaleSuccess = (newQuantity) => {
    onUpdateStock(product.id, newQuantity);
    setShowSellModal(false);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-product.png'; // Fallback para uma imagem padrão
            }}
          />
        ) : (
          <div className="image-loading-placeholder"></div>
        )}
      </div>

      <div className="product-info">
        <div className="product-header">
          <h3>{product.name}</h3>
          <span className={`stock-badge ${!product.status ? 'inactive' : ''}`}>
            {product.status ? `${product.quantity} em estoque` : 'Inativo'}
          </span>
        </div>

        <div className="product-price">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>

        <div className="product-actions">
          <button
            className={`status-btn ${product.status ? 'active' : 'inactive'}`}
            onClick={() => onToggleStatus(product.id)}
          >
            {product.status ? 'Ativo' : 'Inativo'}
          </button>

          <button
            className="sell-btn"
            onClick={() => setShowSellModal(true)}
            disabled={!product.status || product.quantity < 1}
          >
            Vender
          </button>
          
          <button
            className="copy-btn" // Botão adicionado
            onClick={() => onCopyProduct(product.id)}
            title="Copiar Produto"
          >
            Copiar
          </button>

          <Link 
            to={`/products/${product.id}`} 
            className="detail-btn"
          >
            Detalhes
          </Link>
        </div>
      </div>

      {showSellModal && (
        <SellModal
          product={product}
          onClose={() => setShowSellModal(false)}
          onSuccess={handleSaleSuccess}
        />
      )}
    </div>
  );
};

export default ProductCard;