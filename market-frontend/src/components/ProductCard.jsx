import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, CardActions } from '@mui/material';
import { Edit, Visibility, ToggleOn, ToggleOff } from '@mui/icons-material';

export default function ProductCard({ product, onEdit, onDetails, onToggleStatus }) {
  return (
    <Card>
      {product.image && (
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preço: R$ {product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estoque: {product.quantity}
        </Typography>
        <Chip 
          label={product.status ? 'Ativo' : 'Inativo'} 
          color={product.status ? 'success' : 'error'} 
          sx={{ mt: 1 }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<Edit />} onClick={onEdit}>
          Editar
        </Button>
        <Button size="small" startIcon={<Visibility />} onClick={onDetails}>
          Detalhes
        </Button>
        <Button 
          size="small" 
          startIcon={product.status ? <ToggleOn /> : <ToggleOff />}
          onClick={onToggleStatus}
        >
          {product.status ? 'Inativar' : 'Ativar'}
        </Button>
      </CardActions>
    </Card>
  );
}