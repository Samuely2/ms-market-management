import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Card, CardContent, Chip, Box } from '@mui/material';
import { productService } from '../../services/productService';
import { useAuth } from '../../contexts/AuthContext';
import { TextField } from '@mui/material';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saleQuantity, setSaleQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getById(id);
        if (data.seller_id !== user.id) {
          navigate('/products');
          return;
        }
        setProduct(data);
      } catch (err) {
        setError('Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, user.id, navigate]);

  const handleSell = async () => {
    try {
      await productService.sellProduct(id, saleQuantity);
      const updatedProduct = await productService.getById(id);
      setProduct(updatedProduct);
    } catch (err) {
      console.error('Erro ao registrar venda:', err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container maxWidth="md">
      <Button 
        variant="outlined" 
        sx={{ mb: 3 }}
        onClick={() => navigate('/products')}
      >
        Voltar
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          
          {product.image && (
            <Box sx={{ my: 2 }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </Box>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Preço: R$ {product.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 1 }}>
            Quantidade em estoque: {product.quantity}
          </Typography>
          
          <Chip 
            label={product.status ? 'Ativo' : 'Inativo'} 
            color={product.status ? 'success' : 'error'} 
            sx={{ mt: 2, mb: 2 }}
          />

          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="Quantidade"
              type="number"
              value={saleQuantity}
              onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
              inputProps={{ min: 1, max: product.quantity }}
              disabled={!product.status}
            />
            <Button 
              variant="contained" 
              onClick={handleSell}
              disabled={!product.status || product.quantity < 1}
            >
              Registrar Venda
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}