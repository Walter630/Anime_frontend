/**
 * Plugins Index
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import apiConnect from './apiConnect'
import { useAppStore } from '../stores/app'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia)
    .use(apiConnect)
    .use(vueAppInstance => {
      vueAppInstance.config.globalProperties.$isMobile = () => vuetify.display.mobile.value
      vueAppInstance.config.globalProperties.$store = useAppStore()
    })

  app.provide('store', useAppStore())
}
