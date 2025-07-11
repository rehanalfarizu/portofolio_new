// /src/utils/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tambahkan function fetchData
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(`/${endpoint}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export default api
