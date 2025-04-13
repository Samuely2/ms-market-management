import React from 'react';
import { TextField, Button, Grid, Box, FormControlLabel, Switch } from '@mui/material';

export default function ProductForm({ product, onSubmit, loading }) {
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    image: product?.image || '',
    status: product?.status ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Preço"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            inputProps={{ step: "0.01", min: "0" }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantidade"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            inputProps={{ min: "0" }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL da Imagem"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="status"
                checked={formData.status}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Produto ativo"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}