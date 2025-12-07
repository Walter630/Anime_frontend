# ⚡ Quick Reference Guide

## 🎯 Most Important Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/router/index.ts` | Route configuration | Adding new pages |
| `src/stores/app.ts` | Authentication | Auth logic changes |
| `src/stores/WebSocketStore.ts` | Chat functionality | Real-time updates |
| `src/pages/LoginPage.vue` | Login form | Auth UI changes |
| `src/components/AppBarComponent.vue` | Navigation | App header changes |

---

## 🚀 Common Tasks

### Add a New Page

1. Create component in `src/pages/MyPage.vue`
2. Add route in `src/router/index.ts`:
```typescript
{
  path: '/my-page',
  name: 'MyPage',
  component: MyPage,
  meta: { requiresAuth: true }
}
```
3. Link from other pages: `<router-link to="/my-page">`

### Call an API

```typescript
import { useAuthStore } from '@/stores/app'
import axios from 'axios'

const store = useAuthStore()

async function fetchData() {
  try {
    const { data } = await axios.get('/api/endpoint', {
      headers: { 'Authorization': `Bearer ${store.token}` }
    })
    return data
  } catch (error) {
    console.error('API Error:', error)
  }
}
```

### Add a New Store

```typescript
// src/stores/myStore.ts
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({ count: 0 }),
  getters: { doubled: (s) => s.count * 2 },
  actions: { increment() { this.count++ } }
})
```

### Use Store in Component

```typescript
import { useMyStore } from '@/stores/myStore'

const store = useMyStore()
console.log(store.count)
console.log(store.doubled)
store.increment()
```

---

## 🔐 Authentication

### Check if User is Logged In

```typescript
import { useAuthStore } from '@/stores/app'

const auth = useAuthStore()

if (auth.isAuthenticated) {
  console.log('User is logged in')
  console.log('User:', auth.user)
}
```

### Logout User

```typescript
import { useAuthStore } from '@/stores/app'

const auth = useAuthStore()
auth.logout()
// User redirected to /login
```

---

## 💬 Chat/WebSocket

### Connect to Chat

```typescript
import { useChatStore } from '@/stores/WebSocketStore'

const chat = useChatStore()
chat.connect('animeId123')
```

### Send Message

```typescript
chat.sendMessage({
  message: 'Hello!',
  userId: 'user123',
  animeId: 'anime123',
  createdAt: new Date().toISOString()
})
```

### Listen for Messages

```typescript
// Messages automatically appear in chat.messages
const messages = computed(() => chat.messages)
```

---

## 🎨 UI Components

### Button

```vue
<v-btn 
  color="primary" 
  @click="handleClick"
  :loading="isLoading"
>
  Click Me
</v-btn>
```

### Text Field

```vue
<v-text-field
  v-model="email"
  type="email"
  label="Email"
  variant="outlined"
/>
```

### Card

```vue
<v-card>
  <v-card-title>Title</v-card-title>
  <v-card-text>Content</v-card-text>
</v-card>
```

### Grid

```vue
<v-container>
  <v-row>
    <v-col cols="12" md="6">Half width</v-col>
    <v-col cols="12" md="6">Half width</v-col>
  </v-row>
</v-container>
```

### Dialog

```vue
<v-dialog v-model="showDialog">
  <v-card>
    <v-card-title>Confirm?</v-card-title>
    <v-card-actions>
      <v-btn @click="showDialog = false">Cancel</v-btn>
      <v-btn @click="handleConfirm">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
```

---

## 📦 TypeScript Tips

### Define Interface

```typescript
interface User {
  id: string
  email: string
  name: string
}

const user = ref<User | null>(null)
```

### Function with Types

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

### Generic Type

```typescript
interface ApiResponse<T> {
  data: T
  status: number
}

const response = ref<ApiResponse<User> | null>(null)
```

---

## 🐛 Debugging

### Console Logging

```typescript
// Log with label
console.log('Current user:', auth.user)

// Log store state
console.log('Auth state:', auth.$state)

// Error logging
console.error('Error:', error)
```

### DevTools

1. Install Vue DevTools browser extension
2. Open DevTools (F12)
3. Go to Vue tab
4. Inspect components and state

---

## 📡 Environment Variables

### Development

`.env.local`:
```
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws
```

### Production

`.env.production`:
```
VITE_API_BASE_URL=https://api.animeverse.com
VITE_WS_URL=wss://api.animeverse.com/ws
```

### Using in Code

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

---

## 🔄 Data Flow Patterns

### Component → Store → API

```
User Input
    ↓
handleClick()
    ↓
store.action(data)
    ↓
axios.post(endpoint)
    ↓
API Response
    ↓
store.state = response
    ↓
Component re-renders
```

### API → Store → Component

```
API Response
    ↓
store receives data
    ↓
state.items = data
    ↓
Computed reads state
    ↓
Template displays it
```

---

## ⚡ Performance Tips

1. **Use computed() for derived data**
   ```typescript
   const doubled = computed(() => count.value * 2)
   ```

2. **Use v-if instead of v-show for hidden elements**
   ```vue
   <div v-if="isVisible">Content</div>
   ```

3. **Use key binding in lists**
   ```vue
   <div v-for="item in items" :key="item.id">{{ item.name }}</div>
   ```

4. **Lazy load routes**
   ```typescript
   component: () => import('./MyPage.vue')
   ```

---

## 🚨 Common Errors & Fixes

### "Cannot read property 'x' of undefined"
```typescript
// Bad
console.log(user.name)

// Good
console.log(user?.name)
// Or check first
if (user) console.log(user.name)
```

### "Type 'any' is not assignable to type 'User'"
```typescript
// Bad
const user: User = response.data // if response.data is 'any'

// Good
const user: User = response.data as User
```

### "Cannot find module"
```typescript
// Check import path
import Component from '@/components/MyComponent.vue'
// @ is alias for src/
```

### "Token not found"
```typescript
// Check if token is null
if (auth.token) {
  headers.Authorization = `Bearer ${auth.token}`
}
```

---

## 📋 Checklist Before Deploying

- [ ] Run `npm run type-check` - no errors
- [ ] Run `npm run lint` - no warnings
- [ ] Run `npm run build` - builds successfully
- [ ] Test in production mode: `npm run preview`
- [ ] Check all links work
- [ ] Test authentication flow
- [ ] Test API endpoints
- [ ] Test WebSocket chat
- [ ] Check responsive design (mobile)
- [ ] Update environment variables
- [ ] Update API base URL
- [ ] Enable HTTPS
- [ ] Setup CORS properly

---

## 🔗 Useful Links

- 📖 [Full Documentation](./README.md)
- 🏗️ [Application Flow](./APPLICATION_FLOW.md)
- 💻 [Developer Guide](./DEVELOPER_GUIDE.md)
- ✅ [Refactoring Changes](./REFACTORING.md)
- 📊 [Project Summary](./PROJECT_SUMMARY.md)

---

## 🆘 Quick Help

**Port already in use?**
```bash
npx kill-port 5173
```

**Modules not found?**
```bash
rm -r node_modules
npm install
```

**Build errors?**
```bash
npm run type-check
npm run lint
```

**Clear cache?**
```bash
# Clear node_modules and reinstall
npm ci
```

---

## 📞 When to Check Files

| Situation | Check File |
|-----------|-----------|
| Need API endpoint | `DEVELOPER_GUIDE.md` |
| Component example | `DEVELOPER_GUIDE.md` |
| How data flows | `APPLICATION_FLOW.md` |
| Understand store | `DEVELOPER_GUIDE.md` + `app.ts` |
| What was changed | `REFACTORING.md` |
| Setup project | `README.md` + `DEVELOPER_GUIDE.md` |
| Overall status | `PROJECT_SUMMARY.md` |

---

**Print this page or save it as a quick reference!**

Last Updated: December 6, 2024

