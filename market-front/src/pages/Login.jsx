import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import '../styles/auth.css';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const { token, user } = await login(formData.email, formData.password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/products');
    } catch (err) {
      setError(err.error || 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Market Dashboard</h1>
            <p>Acesse sua conta</p>
          </div>
          
          <AuthForm 
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            buttonText="Entrar"
          />
          
          <div className="auth-footer">
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;