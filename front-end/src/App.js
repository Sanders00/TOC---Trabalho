import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import { useAuth } from './context/AuthContext';


const App = () => {
  const { token } = useAuth();

  useEffect(() => {
    // Para garantir que o token seja atualizado caso mude
    console.log("Token atualizado:", token);
  }, [token]);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
