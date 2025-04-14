import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/products.css';

const ProductCard = ({ product, onToggleStatus }) => {
  const imgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!product.image) return;

    const img = new Image();
    img.src = product.image;

    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = product.image;
        setImageLoaded(true);
      }
    };

    img.onerror = () => {
      if (imgRef.current) {
        imgRef.current.style.display = 'none';
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [product.image]);

  return (
    <div className="product-card">
      <div className="image-container">
        {product.image && (
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
      </div>
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
          >
            {product.status ? 'Ativo' : 'Inativo'}
          </button>
          <Link to={`/products/${product.id}`} className="detail-btn">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;