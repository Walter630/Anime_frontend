import { createRouter, createWebHistory } from 'vue-router'
import AnimeComponent from '@/components/AnimeComponent.vue'
import EditarPerfilComponent from '@/components/EditarPerfilComponent.vue'
import EditarPerfilFotoComponent from '@/components/EditarPerfilFotoComponent.vue'
/**
 * Router Configuration
 * Automatic routes for `./src/pages/*.vue`
 */
import HomeComponent from '@/components/HomeComponent.vue'
import PerfilUserComponent from '@/components/PerfilUserComponent.vue'
import MainAdminPage from '@/pages/adminPage/MainAdminPage.vue'
// imports admin
import RegisterAnimePage from '@/pages/adminPage/RegisterAnimePage.vue'
import RegisterUserPage from '@/pages/adminPage/RegisterUserPage.vue'
// import ChatView from '@/components/ChatView.vue' // TODO: Uncomment when backend is active (requires WebSocket)

import indexPage from '@/pages/index.vue'
import LoginPage from '@/pages/LoginPage.vue'
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
          path: '',
          name: 'Home',
          component: HomeComponent,
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
          meta: { requiresAuth: true },
        },

        /* ============================
           ADMIN ROUTES
        ============================= */
        {
          path: 'admin',
          component: MainAdminPage,
          meta: { requiresAuth: true, role: 'ADMIN' },
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
  const requiredRole = to.meta.role

  // If the route does NOT require authentication, allow immediately
  if (!requiresAuth) {
    return next()
  }

  try {
    // Check the token only if the route requires authentication
    const { data } = await apiConnect.get<{ valid: boolean }>('/auth/refresh')

    if (!data.valid) {
      return next({ name: 'Login' })
    }

    // If you need to check role, get the user
    if (requiredRole) {
      const { data: user } = await apiConnect.get<User>('users/me/profile')

     /* if (user.role !== requiredRole) {
        return next({ name: 'Home' })
      }*/
    }

    next()
  } catch (error) {
    // If there's an error in validation, redirect to login
    console.error('Authentication error:', error)
    next({ name: 'Login' })
  }
})

export default router
