import React, { useState, useEffect } from 'react';
import { fetchWithAuth, remove } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ReadingPage = () => {
  const [data, setData] = useState({ content: [], pageable: {}, totalPages: 0, number: 0 });
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchReadings = async (page = 0) => {
    setLoading(true);
    try {
      const result = await fetchWithAuth(`reading?page=${page}&size=10`, token);
      setData(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReading = async (readingId) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta leitura?');
    if (!confirmed) return;
  
    remove(`reading/${readingId}`, token)
          .then(() => {
            alert('Leitura excluído com sucesso.');
            fetchReadings(data.number);
          })
          .catch((error) => {
            console.error(error.message);
            alert('Erro ao excluir o leitura.');
          });
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const handlePageChange = (newPage) => {
    fetchReadings(newPage);
  };

  const sensorItens = data.content?.map((item) => (
    <tr key={item.id}>
      <td>{item.value}</td>
      <td>{item.unit}</td>
      <td>{item.sensor}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteReading(item.id)}>
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



  return (
    <div className="container mt-4">
      <h2>
        Readings
      </h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Unidade</th>
                <th>Sensor</th>
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

export default ReadingPage;
