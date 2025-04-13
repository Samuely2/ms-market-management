import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/api';
import Header from '../components/Header';
import '../styles/auth.css';

const ActivateAccount = () => {
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/activate', {
        activation_code: activationCode
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000); // Redireciona após 2 segundos
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao ativar conta. Tente novamente.');
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
            <h1>Ativar Conta</h1>
            <p>Insira o código recebido por WhatsApp</p>
            {email && <p className="activation-email">Para: {email}</p>}
          </div>
          
          {success ? (
            <div className="auth-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="success-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="success-message">Conta ativada com sucesso!</p>
              <p>Redirecionando para login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="activationCode">Código de 6 dígitos</label>
                <input
                  type="text"
                  id="activationCode"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                  placeholder="Ex: 123456"
                  maxLength="6"
                  pattern="\d{6}"
                  required
                />
              </div>
              
              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Ativando...' : 'Ativar Conta'}
              </button>
            </form>
          )}
          
          <div className="auth-footer">
            <p>Não recebeu o código? <button className="resend-link">Reenviar código</button></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;