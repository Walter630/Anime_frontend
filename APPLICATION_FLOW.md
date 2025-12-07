# 🔄 Application Flow Documentation

## Complete Application Architecture & Data Flow

---

## 1. 📱 Application Entry Point

```
┌────────────────────────────────────────────┐
│          index.html (Entry)                │
│  <div id="app">                            │
│  <script type="module" src="main.ts">      │
└────────────────────┬───────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   main.ts              │
        │ - Create Vue app       │
        │ - Register plugins     │
        │ - Mount to #app        │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  App.vue (Root)        │
        │  <router-view />       │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  Router (index.ts)     │
        │  Route Configuration   │
        └────────────┬───────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    ┌──────────────┐      ┌──────────────┐
    │  Index.vue   │      │  Other Pages │
    │  (Layout)    │      │              │
    └──────────────┘      └──────────────┘
```

---

## 2. 🔐 Authentication Flow

### **Login Process**

```
┌─────────────────────────────────────────────┐
│  1. User visits /login                      │
│     LoginPage.vue loads                     │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  2. User enters email & password            │
│     Form validates input                    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  3. handleLogin() triggered                 │
│     - Validates form fields                 │
│     - Calls useAuthStore.login()            │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  4. axios.post('/auth/login')               │
│     Backend receives credentials            │
└──────────────┬──────────────────────────────┘
               │
               ▼
         ┌──────────┐
         │ Backend  │
         │ Validates│
         │ Creds    │
         └──────────┘
               │
         ┌─────┴─────┐
         │           │
    Success      Failure
         │           │
         ▼           ▼
    ┌────────┐   ┌──────────┐
    │Returns │   │Error     │
    │token & │   │Message   │
    │refresh │   │          │
    └───┬────┘   └──────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│  5. Store receives tokens                   │
│     - token (short-lived)                   │
│     - refreshToken (long-lived)             │
│     - user data                             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  6. Save to localStorage                    │
│     authStore.token = token                 │
│     authStore.refreshToken = refreshToken   │
│     localStorage.setItem('token', token)    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  7. Redirect to Home                        │
│     router.push('/')                        │
│     User authenticated! ✓                   │
└─────────────────────────────────────────────┘
```

### **Token Refresh Process**

```
When token expires or app detects 401 error:

┌──────────────────────────┐
│  useChatStore.refresh()  │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Check refreshToken      │
│  exists?                 │
└──────┬───────────────────┘
       │
    ┌──┴──┐
    │     │
  Yes    No
    │     │
    ▼     ▼
  POST  Clear
  /auth/ auth
  refresh& 
       │ redirect
       │ to login
       ▼
  ┌──────────────┐
  │New token     │
  │received      │
  └──────┬───────┘
         │
         ▼
  ┌──────────────────────┐
  │Save new token        │
  │Continue request      │
  └──────────────────────┘
```

---

## 3. 🏠 Navigation & Page Routing

### **Route Structure**

```
/                           (Index/Layout page)
├── /                       → HomeComponent (Home page)
├── /login                  → LoginPage (Login - no auth required)
├── /register               → RegisterPage (Register - no auth required)
├── /anime/:id              → AnimeComponent (Anime detail - auth required)
├── /anime/:id/chat         → ChatView (Chat - auth required)
├── /profile                → PerfilUserComponent (Profile - auth required)
├── /profile/edit           → EditarPerfilComponent (Edit profile - auth required)
└── /profile/edit-photo     → EditarPerfilFotoComponent (Edit photo - auth required)
```

### **Route Guards (Meta)**

```
Each route has metadata:
- requiresAuth: true/false  → Determines if user needs token

Protected Route Flow:
┌────────────────┐
│  User clicks   │
│  link to /     │
│  anime/1       │
└────────┬───────┘
         │
         ▼
┌──────────────────────┐
│  Router checks meta  │
│  requiresAuth = true │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Check auth store    │
│  isAuthenticated?    │
└────┬────────────┬────┘
     │            │
  Yes (has        No (no
  token)          token)
     │            │
     ▼            ▼
  Allow       Redirect
  navigation  to /login
     │            │
     ▼            ▼
 Load page    Show login
```

---

## 4. 🗂️ State Management (Pinia)

### **useAuthStore (app.ts)**

```
State:
├── token: string | null
│   └── JWT access token (short-lived)
│
├── refreshToken: string | null
│   └── Refresh token (long-lived)
│
└── user: User | null
    ├── id: string
    ├── email: string
    └── name: string

Getters:
├── isAuthenticated: boolean
│   └── Returns !!token
│
└── getUser: User | null
    └── Returns current user

Actions:
├── login(email, password)
│   ├── POST /auth/login
│   ├── Save tokens to state & localStorage
│   └── Return user data
│
├── refresh()
│   ├── Check if refreshToken exists
│   ├── POST /auth/refresh
│   ├── Update token if valid
│   └── Logout if refresh fails
│
└── logout()
    ├── Clear all state
    ├── Remove from localStorage
    └── Redirect to /login
```

### **useChatStore (WebSocketStore.ts)**

```
State:
├── stompClient: StompClient | null
│   └── WebSocket connection instance
│
└── messages: ChatMessage[]
    ├── id: number
    ├── message: string
    ├── userId: string
    ├── animeId: string
    └── createdAt: string

Actions:
├── connect(animeId)
│   ├── Create SockJS connection to /ws
│   ├── Connect with Stomp
│   ├── Subscribe to /topic/chat/{animeId}
│   └── Listen for incoming messages
│
├── sendMessage(msg)
│   ├── Check if connected
│   ├── Send to /app/chat.send
│   └── Handle errors
│
└── disconnect()
    ├── Close connection
    └── Cleanup resources
```

---

## 5. 🧩 Component Architecture

### **Layout Structure**

```
Index.vue (Root Layout)
│
├─ AppBarComponent
│  ├── Logo (clickable, goes to /)
│  ├── Search field
│  └── User Menu
│      ├── Profile
│      ├── My Animes
│      └── Sign Out (calls logout)
│
├─ <router-view /> (Page content)
│  │
│  ├─ HomeComponent
│  │  └── Display recommended animes in grid
│  │
│  ├─ AnimeComponent
│  │  ├── Anime poster & info
│  │  ├── Episodes list
│  │  ├── Watch Now button
│  │  ├── Chat button → /anime/:id/chat
│  │  └── Recommendations
│  │
│  ├─ ChatView
│  │  ├── Connect to WebSocket on mount
│  │  ├── Display messages
│  │  ├── Input field for new message
│  │  └── Send button
│  │
│  ├─ PerfilUserComponent
│  │  ├── User avatar & banner
│  │  ├── Favorite animes grid
│  │  └── Navigation to edit pages
│  │
│  ├─ EditarPerfilComponent
│  │  ├── Edit name, email, password
│  │  ├── Save & Cancel buttons
│  │  └── API call on save
│  │
│  └─ EditarPerfilFotoComponent
│     ├── File input for image
│     ├── Preview selected image
│     ├── Save & Cancel buttons
│     └── Upload via API
│
└─ FooterComponent
   ├── Brand info
   ├── Navigation links
   ├── Social media links
   └── Copyright & terms
```

### **Component Communication**

```
Parent Component
│
├─ Props (Data down)
│  └─ Sends data to child
│
├─ Events (Events up)
│  └─ Child emits events to parent
│
└─ Pinia Store (Shared state)
   ├─ Multiple components access same store
   ├─ No prop drilling needed
   └─ Reactive updates across all components

Example: Chat Component
┌──────────────────────────────┐
│  ChatView.vue                │
├──────────────────────────────┤
│  - Gets animeId from route   │
│  - Access useChatStore       │
│  - Call store.connect()      │
│  - Display store.messages    │
│  - Call store.sendMessage()  │
└──────────────────────────────┘
         │
         ▼
   ┌──────────────┐
   │ useChatStore │ ◄── Shared state
   │ (Pinia)      │      All components
   └──────────────┘      using it see
         │               same data
         └─────┬──────────┘
               │
         ┌─────┴──────┐
         │            │
    Backend    Other
    Service    Components
```

---

## 6. 📡 API Communication

### **HTTP Requests (Axios)**

```
LoginPage.vue
│
└─ handleLogin()
   │
   ├─ useAuthStore.login(email, password)
   │  │
   │  └─ axios.post('http://localhost:8080/auth/login', {
   │        email,
   │        password
   │      })
   │
   └─ Response: {
        token: "eyJhbGc...",
        refreshToken: "eyJhbGc...",
        user: {
          id: "123",
          email: "user@example.com",
          name: "User Name"
        }
      }
```

### **WebSocket Communication**

```
ChatView.vue
│
├─ onMounted()
│  │
│  └─ useChatStore.connect(animeId)
│     │
│     ├─ Create SockJS('http://localhost:8080/ws')
│     │
│     ├─ stompClient.connect()
│     │  │
│     │  └─ Connected ✓
│     │     │
│     │     └─ stompClient.subscribe(
│     │          '/topic/chat/{animeId}',
│     │          (message) => {
│     │            messages.push(JSON.parse(message.body))
│     │          }
│     │        )
│     │
│     └─ Listening for incoming messages...
│
├─ User types message
│
└─ sendMessage()
   │
   ├─ useChatStore.sendMessage({
   │    message: text,
   │    userId: "user123",
   │    animeId: animeId,
   │    createdAt: new Date().toISOString()
   │  })
   │
   └─ stompClient.send('/app/chat.send', {}, JSON.stringify(msg))
      │
      └─ Backend receives & broadcasts to all subscribers
         │
         └─ All clients receive via /topic/chat/{animeId}
            │
            └─ messages array updates reactively ✓
```

---

## 7. 💾 Data Persistence

### **localStorage Usage**

```
User Login:
1. Credentials sent to backend
2. Backend returns tokens
3. useAuthStore saves:
   - localStorage.setItem('token', token)
   - localStorage.setItem('refreshToken', refreshToken)

Page Refresh:
1. App initializes
2. useAuthStore reads from localStorage:
   - token = localStorage.getItem('token')
   - refreshToken = localStorage.getItem('refreshToken')
3. User remains logged in (if token not expired)

Logout:
1. useAuthStore.logout() called
2. Clears all state variables
3. Removes from localStorage:
   - localStorage.removeItem('token')
   - localStorage.removeItem('refreshToken')
4. Redirects to /login
```

### **Reactive State Updates**

```
App State (Pinia Store)
│
├─ token: ref()
│  ├─ Changes trigger watchers
│  ├─ Components using it re-render
│  └─ Computed properties recalculate
│
├─ user: ref()
│  ├─ Update when user data changes
│  └─ Components display new data
│
└─ messages: ref()
   ├─ New messages added to array
   ├─ Components re-render
   └─ DOM updates automatically
```

---

## 8. 🎨 Responsive Design

### **Mobile Detection (index.vue)**

```
┌─────────────────────────────────┐
│  isMobile = ref(false)          │
└──────────────┬──────────────────┘
               │
       ┌───────┴────────┐
       │                │
   onMounted()     onUnmounted()
       │                │
       ▼                ▼
   Check:        Remove
   window.   -   listeners
   innerWidth    on cleanup
   < 768px
       │
       ▼
   ┌──────────┐
   │ true/    │
   │ false    │
   └────┬─────┘
        │
        ▼
   Adjust padding
   on v-main
   based on size
```

---

## 9. 🔄 Error Handling Flow

### **Request Error**

```
axios.post('/auth/login')
        │
        ▼
   Success? ──No──┐
        │        │
      Yes        ▼
        │    catch(error)
        │        │
        │        ▼
        │    console.error()
        │        │
        │        ▼
        │    throw error
        │        │
        ▼        ▼
      Save    Handle in
      data    component
             (try-catch)
```

### **WebSocket Error**

```
stompClient.connect()
        │
        ▼
   Connected? ──No──┐
        │          │
      Yes          ▼
        │      try-catch
        │      console.error()
        ▼
   Subscribe to topic
        │
        ▼
   Message received? ──No──┐
        │                 │
      Yes                 ▼
        │            catch(error)
        │            JSON.parse()
        ▼
   Add to messages[]
   (reactive update)
```

---

## 10. 🔒 Security Considerations

### **Token Management**

```
Request to protected endpoint:
1. Check useAuthStore.isAuthenticated
2. Include token in Authorization header:
   headers: {
     'Authorization': `Bearer ${token}`
   }
3. Backend validates token
4. If valid → Process request
5. If expired → Trigger refresh flow
6. If invalid → Redirect to /login
```

### **WebSocket Authentication**

```
TODO: Currently WebSocket doesn't validate token
Suggested improvement:
1. Include token in WebSocket handshake
2. Verify token before subscribing
3. Validate token on message receive
4. Disconnect if token expires
```

---

## 11. 🚀 Deployment Checklist

```
Before Production:
□ Replace localhost:8080 with actual backend URL
□ Implement input validation on all forms
□ Add error notifications to users
□ Implement proper logging
□ Add loading states to buttons
□ Handle network timeouts
□ Implement request retries
□ Add CORS configuration
□ Set up HTTPS
□ Secure localStorage (consider cookies)
□ Add request rate limiting
□ Implement monitoring/analytics
```

---

## 12. 📊 Application Lifecycle

```
┌─────────────────────────────────────────┐
│          App Initialization             │
│  1. main.ts imports App.vue             │
│  2. registerPlugins() setup             │
│  3. App mounts to #app                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │   Router Ready                 │
    │   - Load initial route          │
    │   - Check auth status           │
    └────────────┬───────────────────┘
                 │
         ┌───────┴────────┐
         │                │
      Logged        Not logged
      in?           in?
         │                │
         ▼                ▼
    Load Home      Load Login
    (protected)    (public)
         │                │
         ▼                ▼
    ┌─────────────────────────────┐
    │  User Interaction           │
    │  - Click links              │
    │  - Submit forms             │
    │  - Chat messages            │
    │  - API requests             │
    └─────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │  Page Cleanup               │
    │  onUnmounted() hooks        │
    │  Remove listeners           │
    │  Close connections          │
    └─────────────────────────────┘
```

---

**Last Updated**: 2024
**Status**: Complete Documentation ✓

