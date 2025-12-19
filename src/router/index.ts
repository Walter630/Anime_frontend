import { createRouter, createWebHistory } from 'vue-router'
import PerfilUserComponent from '@/components/PerfilUserComponent.vue'
import MainAdminPage from '@/pages/adminPage/MainAdminPage.vue'
// imports admin
import RegisterAnimePage from '@/pages/adminPage/RegisterAnimePage.vue'
import RegisterUserPage from '@/pages/adminPage/RegisterUserPage.vue'
import AnimeComponent from '@/pages/AnimeComponent.vue'
import EditarPerfilComponent from '@/pages/EditarPerfilComponent.vue'
import EditarPerfilFotoComponent from '@/pages/EditarPerfilFotoComponent.vue'
import indexPage from '@/pages/index.vue'
// import ChatView from '@/components/ChatView.vue' // TODO: Uncomment when backend is active (requires WebSocket)

import LoginPage from '@/pages/LoginPage.vue'
/**
 * Router Configuration
 * Automatic routes for `./src/pages/*.vue`
 */
import MainHomePage from '@/pages/MainHomePage.vue'
import PlayAnimePage from '@/pages/PlayAnimePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
// Composables
import { apiConnect, type User } from '@/plugins/apiConnect'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: indexPage,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: MainHomePage,
          meta: { requiresAuth: true },
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterPage,
          meta: { requiresAuth: false },
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginPage,
          meta: { requiresAuth: false },
        },
        {
          path: '/anime/:id',
          name: 'Anime',
          component: AnimeComponent,
          meta: { requiresAuth: true },
        },

        {
          path: '/profile',
          name: 'Profile',
          component: PerfilUserComponent,
          meta: { requiresAuth: true },
        },
        {
          path: '/profile/edit',
          name: 'EditProfile',
          component: EditarPerfilComponent,
          meta: { requiresAuth: true },
        },
        {
          path: '/profile/edit-photo',
          name: 'EditProfilePhoto',
          component: EditarPerfilFotoComponent,
          meta: { requiresAuth: true },
        },
        {
          path: '/video/:id',
          name: 'Video',
          component: PlayAnimePage,
        },

        /* ============================
           ADMIN ROUTES
        ============================= */
        {
          path: 'admin',
          component: MainAdminPage,
          meta: { requiresAuth: true },
          children: [
            { path: 'register-animes', name: 'Admin-register-animes', component: RegisterAnimePage },
            { path: 'register-users', name: 'Admin-register-users', component: RegisterUserPage },
          ],
        },

        // TODO: Uncomment when backend is active
        // {
        //   path: '/anime/:id/chat',
        //   name: 'Chat',
        //   component: ChatView,
        //   meta: { requiresAuth: true }
        // },
      ],
    },
  ],
})
/* ============================
   BEFORE EACH (AUTH GUARD)
=============================== */

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  console.log('Going to:', to.fullPath, 'requiresAuth:', requiresAuth)

  // Se a rota não precisa de autenticação, deixa passar
  if (!requiresAuth) {
    return next()
  }

  try {
    // Verifica se existe token
    const token = localStorage.getItem('token')
    if (!token) {
      return next({ name: 'Login' })
    }

    // Aqui você pode opcionalmente verificar token com backend
    // await apiConnect.get('/auth/verify-token') // opcional

    // Define admin fixo
    const isAdmin = localStorage.getItem('email') === 'admin@site.com'

    // Se a rota precisa de admin, verifica
    const requiresAdmin = to.matched.some(r => r.meta.role === 'ADMIN')
    if (requiresAdmin && !isAdmin) {
      return next({ name: 'Home' })
    }

    next()
  } catch (error) {
    console.error('Authentication error:', error)
    next({ name: 'Login' })
  }
})

export default router
