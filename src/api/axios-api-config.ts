import axios from 'axios'

export const axiosApi = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: import.meta.env.VITE_BASE_URL,
})
