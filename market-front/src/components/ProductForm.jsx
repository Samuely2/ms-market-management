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

  const [errors, setErrors] = useState({});
  const [imageStatus, setImageStatus] = useState('idle');
  const imageCheckRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        quantity: product.quantity || '',
        image: product.image || '',
        status: product.status !== undefined ? product.status : true,
      });

      if (product.image) checkImage(product.image);
    }
  }, [product]);

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

    if (imageCheckRef.current) {
      imageCheckRef.current.onload = null;
      imageCheckRef.current.onerror = null;
    }

    const img = new Image();
    imageCheckRef.current = img;

    img.onload = () => setImageStatus('valid');
    img.onerror = () => setImageStatus('invalid');
    img.src = url;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (name === 'image') {
      if (newValue) checkImage(newValue);
      else setImageStatus('idle');
    }

    // Remove erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0)
      newErrors.price = 'Preço inválido.';
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) < 0)
      newErrors.quantity = 'Quantidade inválida.';
    if (formData.image && imageStatus === 'invalid')
      newErrors.image = 'A imagem é inválida ou inacessível.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    });
  };

  const renderError = (field) =>
    errors[field] && <span className="field-error">{errors[field]}</span>;

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Nome do Produto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className={errors.name ? 'input-error' : ''}
        />
        {renderError('name')}
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
            disabled={loading}
            className={errors.price ? 'input-error' : ''}
          />
          {renderError('price')}
        </div>

        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            min="0"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            disabled={loading}
            className={errors.quantity ? 'input-error' : ''}
          />
          {renderError('quantity')}
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
          className={errors.image ? 'input-error' : ''}
        />
        {renderError('image')}

        <div className="image-preview-container">
          {imageStatus === 'checking' && (
            <div className="image-loading">Verificando imagem...</div>
          )}
          {imageStatus === 'valid' && formData.image && (
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
        {loading ? 'Salvando...' : product ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
    </form>
  );
}
