import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Market Management
        </Typography>
        <Button color="inherit" onClick={() => {
          logout();
          navigate('/login');
        }}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;