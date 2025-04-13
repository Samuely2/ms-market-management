import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Header from '../components/Header';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      setRegistered(true);
    } catch (err) {
      setError(err.error || 'Erro no cadastro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <>
        <Header />
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header success-bg">
              <h1>Cadastro realizado!</h1>
              <p>Você receberá um código de 4 dígitos por WhatsApp</p>
            </div>
            
            <div className="auth-body">
              <div className="activation-instructions">
                <p>Por favor, verifique seu WhatsApp e insira o código de 4 dígitos na próxima tela para ativar sua conta.</p>
                
                <button 
                  onClick={() => navigate('/activate', { state: { email: formData.email } })}
                  className="auth-button"
                >
                  Inserir Código de Ativação
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Cadastro de Vendedor</h1>
            <p>Preencha seus dados para criar uma conta</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Já tem uma conta? <a href="/" className="auth-link">Faça login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;