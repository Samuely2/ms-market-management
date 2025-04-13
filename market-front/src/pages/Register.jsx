import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import '../styles/auth.css';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await register(formData);
      setRegistered(true);
      setRegisteredEmail(formData.email);
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
            <div className="auth-header">
              <h1>Cadastro Concluído!</h1>
            </div>
            
            <div className="auth-message">
              <p>Enviamos um código de ativação para:</p>
              <p className="registered-email">{registeredEmail}</p>
              <p>Por favor, verifique seu WhatsApp e insira o código na próxima tela.</p>
              
              <button 
                onClick={() => navigate('/activate', { state: { email: registeredEmail } })}
                className="auth-button"
              >
                Ir para Ativação
              </button>
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
            <p>Já tem uma conta? <a href="/" className="auth-link">Faça login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;