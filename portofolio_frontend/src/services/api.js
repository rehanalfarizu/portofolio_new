// api.js
import axios from 'axios';

const isDevelopment = import.meta.env.DEV;
const API_URL = isDevelopment
  ? import.meta.env.VITE_API_URL || 'http://localhost:3000'
  : import.meta.env.VITE_API_URL_PROD || 'https://your-backend-url.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Aktifkan untuk cookies dan auth
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to requests if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log(`🚀 [${new Date().toLocaleTimeString()}] API Request:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
      hasToken: !!token
    });
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [${new Date().toLocaleTimeString()}] API Success:`, {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });

    // Handle specific error cases
    if (error.response?.status === 429) {
      alert('Terlalu banyak permintaan. Silakan coba lagi nanti.');
    }

    return Promise.reject(error);
  }
);

export const fetchData = async (endpoint, options = {}) => {
  const response = await api.get(endpoint, options);
  return response.data;
};

export const postData = async (endpoint, data, options = {}) => {
  const response = await api.post(endpoint, data, options);
  return response.data;
};

export const putData = async (endpoint, data, options = {}) => {
  const response = await api.put(endpoint, data, options);
  return response.data;
};

export const deleteData = async (endpoint, options = {}) => {
  const response = await api.delete(endpoint, options);
  return response.data;
};

export default api;
