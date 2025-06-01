import axios from 'axios';

// Cria uma instância do axios com configuração base
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL da sua API back-end
});

// Adiciona o token JWT em todas as requisições, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ou sessionStorage se preferir
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
