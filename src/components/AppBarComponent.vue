<template>
  <v-container class="pa-0">
    <v-app-bar class="px-6 d-flex align-center justify-space-between pa-0" color="#141414">
      <!-- LOGO -->
      <img
        alt="Logo"
        src="../../public/LogoAniversePARAHEADER.png"
        style="width: 120px; height: auto; cursor: pointer"
        @click="$router.push('/home')"
      >
      <v-spacer />

      <!-- SEARCH BAR -->
      <v-text-field
        v-model="search"
        hide-details
        outlined
        placeholder="Pesquisar"
        style="margin-right: 10px; background-color: darkgrey"
        variant="outlined"
        @click:append="handleSearch"
      />

      <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background-color: #EE484A">
        <v-icon icon="mdi-magnify" />
      </div>
      <v-spacer />
      <!-- AVATAR / USER MENU -->
      <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props" class="cursor-pointer" size="42">
            <img alt="Avatar" src="/jujutsu.jpg">
            {{ user?.username }}
          </v-avatar>
        </template>

        <v-list>
          <v-list-item @click="$router.push('/profile')">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/profile')">
            <v-list-item-title>My Animes</v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleLogout">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="$router.push('/admin')"
          >
            <v-list-item-title>Admin Panel</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { apiConnect } from '@/plugins/apiConnect'


  export default {
    setup () {
      const router = useRouter()
      const search = ref('')

      // Recupera email do localStorage
      const email = ref(localStorage.getItem('email') || '')

      // Define usuário logado
      const user = computed(() => {
        if (!email.value) return null
        return {
          email: email.value,
          role: email.value === 'admin@site.com' ? 'ADMIN' : 'USER',
        }
      })

      const isAdmin = computed(() => user.value?.role === 'ADMIN')

      const handleSearch = () => {
        apiConnect.get(`/animes?title=${search.value}`)
      }

      const handleLogout = () => {
        apiConnect.logout()
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        router.push('/login')
      }

      return {
        search,
        user,
        isAdmin,
        handleSearch,
        handleLogout,
      }
    },
  }

</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
