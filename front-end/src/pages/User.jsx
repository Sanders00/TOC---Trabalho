import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth, remove } from '../services/api';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const [data, setData] = useState({ content: [], pageable: {}, totalPages: 0, number: 0 });
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async (page = 0) => {
    setLoading(true);
    try {
      const result = await fetchWithAuth(`person?page=${page}&size=10`, token);
      setData(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este usuario?');
    if (!confirmed) return;
  
    remove(`person/${userId}`, token)
          .then(() => {
            alert('Usuario excluído com sucesso.');
            fetchUsers(data.number);
          })
          .catch((error) => {
            console.error(error.message);
            alert('Erro ao excluir o usuario.');
          });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (newPage) => {
    fetchUsers(newPage);
  };

  const sensorItens = data.content?.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.birth}</td>
      <td>{item.roles.map((role) => role).join(', ')}</td>
      <td>{
        item.roles.map((role) => role).find(role => role === 'ADMIN') ?
            null
            :
            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(item.id)}>
                Excluir
            </button>
        }
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
    navigate('/users/new');
  };

  return (
    <div className="container mt-4">
      <h2>
        Usuários
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
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>Perfis</th>
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

export default UserPage;
