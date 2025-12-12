/**
 * Plugins Index
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import router from '../router'
import pinia from '../stores'
import { useAppStore } from '../stores/app'
import apiConnect from './apiConnect'

// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(vuetify).use(router).use(pinia).use(apiConnect).use(vueAppInstance => {
    vueAppInstance.config.globalProperties.$isMobile = () => vuetify.display.mobile.value
    vueAppInstance.config.globalProperties.$store = useAppStore()
  })

  app.provide('store', useAppStore())
}
