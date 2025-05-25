import { useState } from 'react';
import { sellProduct } from '../services/productService';

const SellModal = ({ product, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSell = async () => {
  if (quantity < 1 || quantity > product.quantity) {
    setError(`Quantidade deve ser entre 1 e ${product.quantity}`);
    return;
  }

  setLoading(true);
  setError('');

  try {
    const result = await sellProduct(product.id, quantity);
    
    if (result.success) {
      onSuccess(result.data.remaining_stock);
      onClose();
    } else {
      setError(result.error);
    }
  } catch (error) {
    setError('Erro ao processar a venda');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Vender {product.name}</h3>
        <p>Preço unitário: R$ {product.price.toFixed(2)}</p>
        <p>Estoque disponível: {product.quantity}</p>
        
        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button 
            onClick={handleSell}
            disabled={loading || product.quantity < 1}
          >
            {loading ? 'Processando...' : 'Confirmar Venda'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;