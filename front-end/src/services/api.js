const API_URL = 'http://localhost:8080';
const temp_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBUEkgYXV0aGVudGljYXRpb24iLCJpZCI6IjAwNTkyMjQxLWJiMGYtNDE2NC1iODlkLWE4ZmQ5YzZlNTM2ZSIsInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzM0NDM5MTU3LCJleHAiOjE3MzQ0NDI3NTcsImlzcyI6IlVURlBSIn0.xc45RVkV7MCjimamtqMS4FPeUu7oTQ5keSPZVpt41zQ';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Invalid credentials');
  return response.json(); // Retorna o token
};

export const fetchWithAuth = async (endpoint, token,options = {}) => {
  const { method = 'GET' } = options;
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${temp_token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};
