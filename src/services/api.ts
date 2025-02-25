import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ajuste conforme sua API Django
});

export default api;
