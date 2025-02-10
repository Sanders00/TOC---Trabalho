import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Hook para obter o token de autenticação
import { post } from '../services/api';

const CreateUser = () => {
  const { token } = useAuth(); // Obtenha o token do contexto de autenticação
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    birth: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      await post('person', token, formData);

      alert('Usuario criado com sucesso!');
      setFormData({
        name: '',
        email: '',
        username: '',
        password: '',
        birth: '',
      });
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
      alert(`Erro ao criar usuario: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nome de Usuário</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birth" className="form-label">Data de Nascimento</label>
          <input
            type="date"
            id="birth"
            name="birth"
            className="form-control"
            value={formData.birth}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar Usuário'}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
