import '../styles/products.css';

const ProductForm = ({ product, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    quantity: product?.quantity || '',
    image: product?.image || '',
    status: product?.status ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
        />
        {formData.image && (
          <div className="image-preview">
            <img 
              src={formData.image} 
              alt="Preview" 
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
      </div>

      <div className="form-group checkbox-group">
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
        <label htmlFor="status">Produto ativo</label>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Salvando...' : product?.id ? 'Atualizar' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default ProductForm;