import { useState, useEffect, useRef } from 'react';

export default function ProductForm({ 
  product = null,
  onSubmit, 
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: '',
    status: true,
  });

  const [imageStatus, setImageStatus] = useState('idle'); // 'idle', 'checking', 'valid', 'invalid'
  const imageCheckRef = useRef(null);

  // Carrega os dados do produto quando recebido
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        quantity: product.quantity || '',
        image: product.image || '',
        status: product.status !== undefined ? product.status : true,
      });
      
      // Verifica a imagem inicial apenas se existir
      if (product.image) {
        checkImage(product.image);
      }
    }
  }, [product]);

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      if (imageCheckRef.current) {
        imageCheckRef.current.onload = null;
        imageCheckRef.current.onerror = null;
      }
    };
  }, []);

  const checkImage = (url) => {
    setImageStatus('checking');
    
    // Cancela qualquer verificação anterior
    if (imageCheckRef.current) {
      imageCheckRef.current.onload = null;
      imageCheckRef.current.onerror = null;
    }

    const img = new Image();
    imageCheckRef.current = img;
    
    img.onload = () => {
      setImageStatus('valid');
    };
    
    img.onerror = () => {
      setImageStatus('invalid');
    };
    
    img.src = url;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Verifica a imagem apenas quando o campo de imagem é alterado
    if (name === 'image') {
      if (newValue) {
        checkImage(newValue);
      } else {
        setImageStatus('idle');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Nome do Produto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            min="0"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Imagem (URL)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
          disabled={loading}
        />
        
        <div className="image-preview-container">
          {imageStatus === 'checking' && (
            <div className="image-loading">Verificando imagem...</div>
          )}
          
          {imageStatus === 'valid' && (
            <img 
              src={formData.image} 
              alt="Preview do produto" 
              className="image-preview"
              onError={() => setImageStatus('invalid')}
            />
          )}
          
          {imageStatus === 'invalid' && formData.image && (
            <div className="image-error">
              <p>Não foi possível carregar a imagem</p>
              <small>A URL parece inválida ou o servidor não permite acesso</small>
            </div>
          )}
        </div>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="product-status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          disabled={loading}
        />
        <label htmlFor="product-status">Produto ativo</label>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={loading || imageStatus === 'checking'}
      >
        {loading ? (
          <span>Salvando...</span>
        ) : (
          <span>{product ? 'Atualizar Produto' : 'Cadastrar Produto'}</span>
        )}
      </button>
    </form>
  );
}