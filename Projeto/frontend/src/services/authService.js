// src/services/authService.js
import api from './api.js';

export async function login(user, password) {
  const { data } = await api.post('/login', { user, password });
  return data;
}
