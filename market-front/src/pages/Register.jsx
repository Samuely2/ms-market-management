import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import '../styles/auth.css';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await register(formData);
      navigate('/activate', { state: { email: formData.email } });
    } catch (err) {
      setError(err.error || 'Erro no cadastro. Por favor, tente novamente.');
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
            <p>Crie sua conta de vendedor</p>
          </div>
          
          <AuthForm 
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            buttonText="Cadastrar"
            showNameField={true}
            showCnpjField={true}
            showPhoneField={true}
          />
          
          <div className="auth-footer">
            <p>Já tem uma conta? <Link to="/" className="auth-link">Faça login</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;