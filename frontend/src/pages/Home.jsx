import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Sensores IoT</h1>
      <p>Bem-vindo ao aplicativo de monitoramento de sensores!</p>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/sensors')}
        >
          Ir para Sensores
        </button>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/readings')}
        >
          Ir para Leituras
        </button>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/users')}
        >
          Ir para Usuários
        </button>
      </div>
    </div>
  );
};

export default Home;
