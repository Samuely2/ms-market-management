import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, CircularProgress, Typography } from '@mui/material';
import { productService } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../contexts/AuthContext';

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.list();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await productService.toggleStatus(id);
      setProducts(products.map(p => 
        p.id === id ? { ...p, status: !p.status } : p
      ));
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ my: 3 }}
        onClick={() => navigate('/products/new')}
      >
        Novo Produto
      </Button>

      <Grid container spacing={3}>
        {products.filter(p => p.seller_id === user.id).map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              product={product}
              onEdit={() => navigate(`/products/${product.id}/edit`)}
              onDetails={() => navigate(`/products/${product.id}`)}
              onToggleStatus={() => handleToggleStatus(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}