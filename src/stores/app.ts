import type {Anime, User} from '@/plugins/apiConnect'
// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as User | null,
    isMobile: false,
    animes: null as Anime | null,
    loadingPage: false,
  }),

  actions: {
    setUser (user: User | null) {
      this.user = user
    },
    getUser () {
      return this.user
    },
    getAnimeById (id: string) {
      return this.animes
        ? (this.animes as unknown as Anime[]).find((anime: Anime) => anime.id === id)
        : null
    },

    setAnimes (animes: Anime[]) {
      // @ts-ignore
      this.animes = animes
    },
    setIsMobile (value: boolean) {
      this.isMobile = value
    },

    setLoadingPage (value: boolean) {
      this.loadingPage = value
    },
  },

})
