import axios from 'axios'
console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL)

export const axiosApi = axios.create({
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: import.meta.env.VITE_BASE_URL,
})
