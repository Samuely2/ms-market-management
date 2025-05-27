import { useState, useEffect, useRef } from 'react';

export default function ProductForm({
  product = null,
  onSubmit,
  loading = false,
  formClassName = '',
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

      if (product.image) {
        checkImage(product.image);
      }
    }
  }, [product]);

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
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'image' && value) checkImage(value);
    if (name === 'image' && !value) setImageStatus('idle');

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = 'Preço deve ser maior que 0';
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) < 0)
      newErrors.quantity = 'Quantidade deve ser 0 ou maior';
    if (!formData.image.trim()) newErrors.image = 'URL da imagem é obrigatória';
    if (imageStatus === 'invalid') newErrors.image = 'Imagem inválida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`product-form ${formClassName}`} noValidate>
      <div className="form-group">
        <label>Nome do Produto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.price && <div className="field-error">{errors.price}</div>}
        </div>

        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.quantity && <div className="field-error">{errors.quantity}</div>}
        </div>
      </div>

      <div className="form-group">
        <label>Imagem (URL)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={errors.image ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.image && <div className="field-error">{errors.image}</div>}

        <div className="image-preview-container">
          {imageStatus === 'checking' && <div>Verificando imagem...</div>}
          {imageStatus === 'valid' && (
            <img src={formData.image} alt="Prévia" className="image-preview" />
          )}
          {imageStatus === 'invalid' && (
            <div className="image-error">
              <p>URL inválida ou imagem inacessível</p>
            </div>
          )}
        </div>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          disabled={loading}
        />
        <label htmlFor="status">Produto ativo</label>
      </div>

      <button type="submit" className="submit-btn" disabled={loading || imageStatus === 'checking'}>
        {loading ? 'Salvando...' : 'Salvar alterações'}
      </button>
    </form>
  );
}
