const API_URL = 'http://localhost:8080';
const temp_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBUEkgYXV0aGVudGljYXRpb24iLCJpZCI6IjJmYTA1NDNiLTk4YjEtNDk1Ny04YjQ0LTQ0MjE5MjU3MzkyNyIsInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzM0NTM4OTM1LCJleHAiOjE3MzQ1NDI1MzUsImlzcyI6IlVURlBSIn0.2lUQSclwzI0UKKb_tMxCs8l3Crq81-5byRQvnsczxbs';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json(); // Retorna o token
};

export const post = async (endpoint, token, body) => {

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const fetchWithAuth = async (endpoint, token, options = {}, body) => {
  const { method = 'GET' } = options;

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};


export const remove = (endpoint, token) => {
  return fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}`},
  });
};  