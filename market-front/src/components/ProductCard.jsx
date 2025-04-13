import { Link } from 'react-router-dom';
import '../styles/products.css';

const ProductCard = ({ product, onToggleStatus }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image || 'https://via.placeholder.com/300'} 
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <div className="product-header">
          <h3>{product.name}</h3>
          <span className={`stock-badge ${!product.status ? 'inactive' : ''}`}>
            {product.quantity} em estoque
          </span>
        </div>
        <p className="product-price">R$ {product.price.toFixed(2)}</p>
        
        <div className="product-actions">
          <button
            onClick={() => onToggleStatus(product.id)}
            className={`status-btn ${product.status ? 'active' : 'inactive'}`}
            title={product.status ? 'Inativar' : 'Ativar'}
          >
            {product.status ? 'Ativo' : 'Inativo'}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="detail-btn"
            title="Detalhes"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;