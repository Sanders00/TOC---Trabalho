import React from 'react';
import {Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Home from './pages/Home';
import Sensors from './pages/Sensors';
import Readings from './pages/Readings';
import CreateSensor from './pages/NewSensor';
import User from './pages/User';
import CreateUser from './pages/NewUser';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const PageHeader = () => {
  const { token, login, logout } = useAuth(); // Obtém o estado de autenticação e funções do contexto

  const handleLogin = () => {
    // Aqui você pode redirecionar para a página de login
    console.log('Redirecionar para login');
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">App IoT</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/sensors" className="nav-link active">Sensores</Link>
            </li>
            <li className="nav-item">
              <Link to="/readings" className="nav-link active">Readings</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link active">Usuários</Link>
            </li>
          </ul>
        </div>
        {token ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logoff
          </button>
        ) : (
          null
        )}
        
      </div>
    </nav>
  );
}

const AppRoutes = () => (

  <Router>
    <PageHeader />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/sensors" element={<PrivateRoute><Sensors /></PrivateRoute>} />
      <Route path="/sensors/new" element={<PrivateRoute><CreateSensor /></PrivateRoute>} />
      <Route path="/readings" element={<PrivateRoute><Readings /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
      <Route path="/users/new" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default AppRoutes;
