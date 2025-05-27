import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm'; 
import '../styles/auth.css';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await register(data);
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

          <AuthForm
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            buttonText="Criar Conta"
            showNameField
            showCnpjField
            showPhoneField
          />
          
          <div className="auth-footer">
            <p>Já tem uma conta? <a href="/" className="auth-link">Faça login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;