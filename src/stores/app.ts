import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null as any
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email: string, senha: string) {
      const { data } = await axios.post('http://localhost:8080/auth/login', {
        email,
        senha
      })

      this.token = data.token
      this.refreshToken = data.refreshToken
      this.user = data.user

      localStorage.setItem('token', this.token)
      localStorage.setItem('refreshToken', this.refreshToken)

      return data
    },

    async refresh() {
      if (!this.refreshToken) return

      const { data } = await axios.post('http://localhost:8080/auth/refresh', {
        refreshToken: this.refreshToken
      })

      this.token = data.token
      localStorage.setItem('token', this.token)
    },

    logout() {
      this.token = null
      this.refreshToken = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }
})
