/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
import HomeComponent from '@/components/HomeComponent.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import IndexPage from '@/pages/index.vue'
import AnimeComponent from '@/components/AnimeComponent.vue'
import PerfilUserComponent from '@/components/PerfilUserComponent.vue'
import EditarPerfilComponent from '@/components/EditarPerfilComponent.vue'
import EditarPerfilFotoComponent from '@/components/EditarPerfilFotoComponent.vue'
import ChatView from '@/components/ChatView.vue'
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexPage,
      children: [
        {
          path: '',
          name: 'Main',
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
          path: "/anime/:id",
          name: 'AnimeId',
          component: AnimeComponent,
          meta: { requiresAuth: true },
        },
        {
          path: "/anime/:id/chat",
          name: "chat",
          component: ChatView,
          meta: { requiresAuth: true }
        },
        {
          path: "/perfil",
          name: 'Perfil',
          component: PerfilUserComponent,
          meta: { requiresAuth: true },
        },
        {
          path: "/perfil/editar",
          name: 'EditarPerfil',
          component: EditarPerfilComponent,
          meta: { requiresAuth: true },
        },
        {
          path: "/perfil/editar-foto",
          name: 'EditarPerfilFoto',
          component: EditarPerfilFotoComponent,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
