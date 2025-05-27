import React, { useState } from 'react';
import '../styles/auth.css';

const AuthForm = ({
  onSubmit,
  error,
  loading,
  buttonText,
  showNameField = false,
  showCnpjField = false,
  showPhoneField = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (showNameField && !formData.name.trim()) {
      newErrors.name = 'Nome obrigatório';
    }

    if (showCnpjField && !formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ obrigatório';
    }

    if (showPhoneField && !formData.phone.trim()) {
      newErrors.phone = 'Telefone obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo de 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      {error && <div className="error-message">{error}</div>}

      {showNameField && (
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>
      )}

      {showCnpjField && (
        <div className="form-group">
          <label htmlFor="cnpj">CNPJ</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className={errors.cnpj ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.cnpj && <div className="field-error">{errors.cnpj}</div>}
        </div>
      )}

      {showPhoneField && (
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
          disabled={loading}
        />
        {errors.password && (
          <div className="field-error">{errors.password}</div>
        )}
      </div>

      <button type="submit" disabled={loading} className="auth-button">
        {loading ? 'Carregando...' : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;

