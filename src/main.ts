/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Polyfill for `global` used by some libraries (e.g., sockjs-client)
// Only set if not present in the browser environment.
if (typeof (window as any).global === 'undefined') {
  ;(window as any).global = window
}

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
