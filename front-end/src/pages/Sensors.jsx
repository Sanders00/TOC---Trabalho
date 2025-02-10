import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth, remove } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SensorPage = () => {
  const [data, setData] = useState({ content: [], pageable: {}, totalPages: 0, number: 0 });
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSensors = async (page = 0) => {
    setLoading(true);
    try {
      const result = await fetchWithAuth(`sensor?page=${page}&size=10`, token);
      setData(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSensor = async (sensorId) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este sensor?');
    if (!confirmed) return;

    remove(`sensor/${sensorId}`, token)
      .then(() => {
        alert('Sensor excluído com sucesso.');
        fetchSensors(data.number);
      })
      .catch((error) => {
        console.error(error.message);
        alert('Erro ao excluir o sensor.');
      });
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  const handlePageChange = (newPage) => {
    fetchSensors(newPage);
  };

  const sensorItens = data.content?.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.location}</td>
      <td>{item.type}</td>
      <td>{item.status ? 'Ativo' : 'Inativo'}</td>
      <td>{item.installationDate}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteSensor(item.id)}>
          Excluir
        </button>
      </td>
    </tr>
  ));

  const renderPagination = () => {
    const { totalPages, number } = data;
    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${number === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(number - 1)}>
              Anterior
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className={`page-item ${number === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${number === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(number + 1)}>
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const handleNewSensor = () => {
    navigate('/sensors/new');
  };

  return (
    <div className="container mt-4">
      <h2>
        Sensores
        <button className="btn btn-primary ms-2" onClick={handleNewSensor}>
          <i className="fas fa-plus-circle"></i> Novo
        </button>
      </h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Local</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Data de Instalação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{sensorItens}</tbody>
          </table>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default SensorPage;
