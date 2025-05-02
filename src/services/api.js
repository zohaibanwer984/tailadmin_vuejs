import axios from 'axios'
import { router } from '@/main'
import { setLoading } from '@/stores/loading'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    setLoading(true) // Start loading
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    setLoading(false) // Stop loading on error
    return Promise.reject(error)
  },
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    setLoading(false) // Stop loading
    return response
  },
  (error) => {
    setLoading(false) // Stop loading on error
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default apiClient

// Utility function to create FormData
const createFormData = (payload) => {
  const formData = new FormData()
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key])
  })
  return formData
}

// Utility function for making POST requests
const postRequest = (url, payload, isFormData = false) => {
  const data = isFormData ? createFormData(payload) : payload
  const headers = isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' }

  return apiClient.post(url, data, { headers })
}

// Auth service
export const authService = {
  login(credentials) {
    return postRequest('/auth/login/', credentials, true)
  },

  logout() {
    return postRequest('/auth/logout/', {})
  },

  requestPasswordReset(payload) {
    return postRequest('/auth/password-reset/', payload, true)
  },

  resetPasswordConfirm(payload) {
    return postRequest('/auth/password-reset/confirm/', payload, true)
  },
}
