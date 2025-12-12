import type { User } from '@/plugins/apiConnect'
// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as User | null,
    isMobile: false,
    loadingPage: false,
  }),

  actions: {
    setUser (user: User | null) {
      this.user = user
    },
    getUser () {
      return this.user
    },

    setIsMobile (value: boolean) {
      this.isMobile = value
    },

    setLoadingPage (value: boolean) {
      this.loadingPage = value
    },
  },

})
