import { defineStore } from 'pinia'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    userType: null,
    token: localStorage.getItem('token') || null,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getUserType: (state) => state.userType,
    getError: (state) => state.error,
  },

  actions: {
    login(credentials) {
      this.error = null
      return new Promise((resolve, reject) => {
        authService
          .login(credentials)
          .then(({ data }) => {
            this.token = data.token
            localStorage.setItem('token', this.token)
            this.user = data.user
            this.userType = data['user-type']
            resolve(data)
          })
          .catch((error) => {
            this.error = error.response?.data || 'Login failed. Please try again.'
            reject(error.response?.data)
          })
      })
    },

    logout() {
      return new Promise((resolve, reject) => {
        authService
          .logout()
          .then(() => {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            resolve(true)
          })
          .catch((error) => {
            this.error = error.response?.data?.message || 'Logout failed. Please try again.'
            reject(error.response?.data)
          })
      })
    },

    requestPasswordReset(payload) {
      this.error = null
      return new Promise((resolve, reject) => {
        authService
          .requestPasswordReset(payload)
          .then(({ data }) => {
            resolve(data)
          })
          .catch((error) => {
            this.error = error.response?.data || 'Failed to send password reset email.'
            reject(error.response?.data)
          })
      })
    },

    checkAuth() {
      if (this.token) {
        this.fetchUserData()
      }
    },

    clearError() {
      this.error = null
    },
  },
})