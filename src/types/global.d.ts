import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import type { Vuetify } from 'vuetify'
import type { useAppStore } from '@/stores/app'

type Route = Router.currentRoute.value

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    axios: AxiosInstance
    $vuetify: Vuetify
    $router: Router
    $route: Route
    $isMobile: () => boolean
    $refs: Reference
    $store: useAppStore
  }
}
