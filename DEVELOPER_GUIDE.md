# 📖 Developer Guide

## Setup & Development Instructions

---

## ✅ Prerequisites

- Node.js >= 16.x
- npm >= 8.x or yarn
- Git
- VS Code or JetBrains IDE
- Basic Vue 3 knowledge

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd C:\Users\jwnet\Site_anime\anime_frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or similar port)

### 3. Build for Production

```bash
npm run build
```

### 4. Type Checking

```bash
npm run type-check
```

### 5. Linting & Formatting

```bash
npm run lint
```

---

## 📁 Project Structure

```
anime_frontend/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── jujutsu.jpg
│   ├── myhero.jpg
│   ├── one-punch-man.jpg
│   └── sakamotoD.jpg
│
├── src/
│   ├── App.vue                      # Root component
│   ├── main.ts                      # Entry point
│   │
│   ├── pages/                       # Page components
│   │   ├── index.vue                # Layout wrapper
│   │   ├── LoginPage.vue            # Login form
│   │   └── RegisterPage.vue         # Registration form
│   │
│   ├── components/                  # Reusable components
│   │   ├── AppBarComponent.vue      # Top navigation
│   │   ├── FooterComponent.vue      # Footer
│   │   ├── HomeComponent.vue        # Home page
│   │   ├── AnimeComponent.vue       # Anime detail
│   │   ├── ChatView.vue             # Chat interface
│   │   ├── PerfilUserComponent.vue  # User profile
│   │   ├── EditarPerfilComponent.vue        # Edit profile
│   │   └── EditarPerfilFotoComponent.vue    # Edit photo
│   │
│   ├── router/
│   │   └── index.ts                 # Route definitions
│   │
│   ├── stores/                      # Pinia stores
│   │   ├── index.ts                 # Store initialization
│   │   ├── app.ts                   # Auth store
│   │   └── WebSocketStore.ts        # Chat store
│   │
│   ├── plugins/
│   │   ├── index.ts                 # Plugin registration
│   │   └── vuetify.ts               # Vuetify config
│   │
│   ├── assets/                      # Images & media
│   │   ├── logo.svg
│   │   └── logo.png
│   │
│   └── styles/
│       └── settings.scss            # Global styles
│
├── REFACTORING.md                   # Changes documentation
├── APPLICATION_FLOW.md              # Architecture & flow
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.mts                  # Vite config
└── index.html                       # HTML entry
```

---

## 🔧 Configuration Files

### `vite.config.mts`
- Bundler and dev server configuration
- Plugin setup for Vue, Vuetify, fonts, etc.

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (@/ = src/)

### `package.json`
- Dependencies and dev dependencies
- Script commands

---

## 📚 Working with Components

### Creating a New Component

```typescript
<!-- MyComponent.vue -->
<template>
  <v-container>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Default message'
})

const count = ref<number>(0)

function increment(): void {
  count.value++
}
</script>

<style scoped>
/* Component-specific styles */
</style>
```

### Component Naming Convention

- Use PascalCase for component filenames
- `MyComponent.vue` not `my-component.vue`
- Import with same name: `import MyComponent from '@/components/MyComponent.vue'`

### Props & Events

```typescript
// Define props with types
const props = defineProps<{
  title: string
  count: number
  optional?: string
}>()

// Define emits
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()

// Use in template
<button @click="emit('update', newValue)">Update</button>
```

---

## 🏪 Working with Pinia Stores

### Accessing Store in Component

```typescript
import { useAuthStore } from '@/stores/app'

const authStore = useAuthStore()

// Get state
console.log(authStore.token)
console.log(authStore.user)

// Use getters
console.log(authStore.isAuthenticated)

// Call actions
await authStore.login(email, password)
```

### Creating New Store

```typescript
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    count: 0 as number,
    items: [] as string[]
  }),

  getters: {
    doubleCount: (state) => state.count * 2
  },

  actions: {
    increment() {
      this.count++
    },

    async fetchItems() {
      try {
        const response = await fetch('/api/items')
        this.items = await response.json()
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    }
  }
})
```

---

## 🛣️ Router Configuration

### Adding New Route

```typescript
// In src/router/index.ts
const router = createRouter({
  // ...
  routes: [
    {
      path: '/new-page',
      name: 'NewPage',
      component: NewPageComponent,
      meta: { requiresAuth: true }
    }
  ]
})
```

### Route Meta

```typescript
// Check in component
const route = useRoute()
console.log(route.meta.requiresAuth) // true/false
```

### Programmatic Navigation

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

// Push to new route
router.push('/profile')
router.push({ name: 'Profile' })

// Go back
router.back()

// Replace (no history entry)
router.replace('/login')
```

---

## 📡 API Communication

### Using Axios

```typescript
import axios from 'axios'

// GET request
const { data } = await axios.get('/api/animes')

// POST request
const { data } = await axios.post('/api/auth/login', {
  email: 'user@example.com',
  password: 'password123'
})

// With headers
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
const { data } = await axios.get('/api/profile', config)

// Error handling
try {
  const response = await axios.get('/api/data')
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.status)
  }
}
```

### Setting Base URL (TODO)

```typescript
// In src/main.ts or plugin
axios.defaults.baseURL = 'http://localhost:8080'

// Or in vite.config.mts proxy
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

---

## 🔌 WebSocket Communication

### Connecting to WebSocket

```typescript
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const socket = new SockJS('http://localhost:8080/ws')
const stompClient = Stomp.over(socket)

// Connect
stompClient.connect({}, () => {
  console.log('Connected!')

  // Subscribe to topic
  stompClient.subscribe('/topic/chat/1', (message) => {
    const data = JSON.parse(message.body)
    console.log('Received:', data)
  })
})

// Send message
stompClient.send('/app/chat.send', {}, JSON.stringify({
  message: 'Hello',
  userId: '123'
}))

// Disconnect
stompClient.disconnect(() => {
  console.log('Disconnected')
})
```

---

## 🎨 Using Vuetify Components

### Common Components

```vue
<!-- Button -->
<v-btn color="primary" size="large">Click me</v-btn>

<!-- Text Field -->
<v-text-field
  v-model="email"
  type="email"
  label="Email"
  variant="outlined"
/>

<!-- Card -->
<v-card>
  <v-card-title>Title</v-card-title>
  <v-card-text>Content</v-card-text>
</v-card>

<!-- Container & Grid -->
<v-container>
  <v-row>
    <v-col cols="12" md="6">Column 1</v-col>
    <v-col cols="12" md="6">Column 2</v-col>
  </v-row>
</v-container>

<!-- Dialog -->
<v-dialog v-model="showDialog">
  <v-card>
    <v-card-title>Confirm</v-card-title>
    <v-card-text>Are you sure?</v-card-text>
  </v-card>
</v-dialog>
```

### Responsive Grid

```vue
<!-- Responsive columns -->
<v-col cols="12" sm="6" md="4" lg="3">
  <!-- 12 cols on mobile, 6 on tablet, 4 on desktop, 3 on large -->
</v-col>
```

---

## 📝 TypeScript Tips

### Type Checking

```typescript
// Export interfaces
export interface User {
  id: string
  email: string
  name: string
}

// Use in function
function getUser(id: string): User | null {
  // ...
}

// Use in component
const user = ref<User | null>(null)
```

### Utility Types

```typescript
// Partial - all properties optional
type PartialUser = Partial<User>

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>

// Record - key-value mapping
type Status = Record<'pending' | 'complete', string>
```

---

## 🐛 Debugging

### Vue DevTools

Install browser extension for Vue DevTools to:
- Inspect component state
- View component tree
- Track events
- Debug Pinia stores

### Console Logging

```typescript
// Log with label
console.log('Login attempt:', { email, password })

// Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info')
}

// Log store state
const store = useAuthStore()
console.log('Auth state:', store.$state)
```

### Network Debugging

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. See all API requests and responses

---

## ✨ Best Practices

### Code Style

- Use TypeScript strict mode
- Type all function parameters and returns
- Use const/let, avoid var
- Use template literals for strings with variables
- Use arrow functions in most cases

### Component Development

- Keep components small and focused
- Extract logic to composables
- Use reactive data properly (ref, computed)
- Avoid accessing DOM directly
- Use v-if/v-show appropriately

### Performance

- Use lazy loading for routes
- Memoize expensive computations
- Avoid watchers when possible
- Use computed properties
- Implement virtual scrolling for large lists

### Security

- Never store sensitive data in localStorage
- Validate all user inputs
- Sanitize API responses
- Use HTTPS in production
- Implement CORS properly

---

## 🔄 Common Tasks

### Add New Page

1. Create component in `src/pages/`
2. Add route in `src/router/index.ts`
3. Link from other pages
4. Test navigation

### Connect to API Endpoint

1. Create store action in Pinia
2. Use axios to make request
3. Handle response and errors
4. Update component to use action
5. Display data in template

### Add New State

1. Add to Pinia store state
2. Create getter if needed
3. Create action to update
4. Use in component with store

### Add Authentication

1. Already implemented in `useAuthStore`
2. Check `isAuthenticated` before showing page
3. Include token in API requests
4. Handle token expiration with refresh

---

## 📞 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### TypeScript Errors

```bash
# Run type checking
npm run type-check

# Check tsconfig.json paths
```

### Vite Hot Module Reload Not Working

1. Check if file extensions are .vue, .ts, .tsx
2. Restart dev server
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

---

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

---

**Last Updated**: 2024
**Maintained by**: Development Team

