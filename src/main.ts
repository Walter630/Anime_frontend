/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Composables
import { createApp } from 'vue'

// Polyfill for `global` used by some libraries (e.g., sockjs-client)
// Only set if not present in the browser environment.
// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'

if ((window as any).global === undefined) {
  ;(window as any).global = window
}

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
