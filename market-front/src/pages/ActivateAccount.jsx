import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/api';
import Header from '../components/Header';
import '../styles/auth.css';

const ActivateAccount = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};

  // Contador para reenvio
  useEffect(() => {
    if (countdown > 0 && !success) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, success]);

  const handleCodeChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value.replace(/\D/g, '');
    setCode(newCode);
    
    // Avança para o próximo campo
    if (e.target.value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activationCode = code.join('');
    
    if (activationCode.length !== 4) {
      setError('Por favor, insira um código de 4 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/activate', {
        activation_code: activationCode
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Código inválido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    try {
      await axios.post('/resend-code', { email });
      setCountdown(30);
      setError('');
    } catch (err) {
      setError('Erro ao reenviar código. Tente novamente.');
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Ativar Conta</h1>
            <p>Insira o código de 4 dígitos enviado para seu WhatsApp</p>
            {email && <p className="activation-email">{email}</p>}
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
              
              <div className="code-input-container">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(e, index)}
                    className="code-input"
                    autoFocus={index === 0}
                    disabled={loading}
                  />
                ))}
              </div>
              
              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Verificando...' : 'Ativar Conta'}
              </button>
            </form>
          )}
          
          <div className="auth-footer">
            <p>
              Não recebeu o código? 
              <button 
                onClick={handleResendCode}
                disabled={countdown > 0}
                className="resend-link"
              >
                {countdown > 0 ? `Reenviar (${countdown}s)` : 'Reenviar código'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;