import axios from 'axios'
import { useSelector } from 'react-redux'

const instance = axios.create({
  // baseURL: 'https://drab-red-yak-tam.cyclic.app'
  baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  config.headers = { Authorization: `Bearer ${token}` }
  return config
})

export default instance
