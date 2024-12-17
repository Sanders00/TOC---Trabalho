import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Hook para obter o token de autenticação
import { fetchWithAuth } from '../services/api';

const CreateSensor = () => {
  const { token } = useAuth(); // Obtenha o token do contexto de autenticação
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    status: true,
    installationDate: '',
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
      await fetchWithAuth('sensor', token, {
        method: 'POST',
        body: formData,
      });

      alert('Sensor criado com sucesso!');
      setFormData({
        name: '',
        location: '',
        type: '',
        status: true,
        installationDate: '',
      });
    } catch (error) {
      console.error('Erro ao criar sensor:', error);
      alert(`Erro ao criar sensor: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Novo Sensor</h2>
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
          <label htmlFor="location" className="form-label">Localização</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">Tipo</label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="status"
            name="status"
            className="form-check-input"
            checked={formData.status}
            onChange={handleInputChange}
          />
          <label htmlFor="status" className="form-check-label">Ativo</label>
        </div>

        <div className="mb-3">
          <label htmlFor="installationDate" className="form-label">Data de Instalação</label>
          <input
            type="date"
            id="installationDate"
            name="installationDate"
            className="form-control"
            value={formData.installationDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar Sensor'}
        </button>
      </form>
    </div>
  );
};

export default CreateSensor;
