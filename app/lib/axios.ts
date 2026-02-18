import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://gowoobro.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
