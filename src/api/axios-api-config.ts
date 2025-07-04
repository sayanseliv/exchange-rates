import axios from 'axios'

export const axiosApi = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: import.meta.env.VITE_BASE_URL,
})
