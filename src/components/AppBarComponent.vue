<template>
  <v-container class="pa-0">
  <v-app-bar color="#141414" class="px-6 d-flex align-center justify-space-between pa-0">
    <!-- LOGO -->
    <img
      alt="Logo"
      src="../../public/LogoAniversePARAHEADER.png"
      style="width: 120px; height: auto; cursor: pointer"
      @click="$router.push('/')"
    />
    <v-spacer />

    <!-- SEARCH BAR -->
    <v-text-field
      v-model="search"
      placeholder="Pesquisar"
      style="margin-right: 10px; background-color: darkgrey"
      variant="outlined"
      outlined
      hide-details
      @click:append="handleSearch"
    />

    <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background-color: #EE484A">
      <v-icon icon="mdi-magnify" />
    </div>
    <v-spacer />

    <!-- AVATAR / USER MENU -->
    <v-menu>
      <template #activator="{ props }">
        <v-avatar v-bind="props" size="42" class="cursor-pointer">
          <img alt="Avatar" src="/jujutsu.jpg" />
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
      </v-list>
    </v-menu>
  </v-app-bar>
</v-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiConnect } from '@/plugins/apiConnect'

interface User {
  id: string
  username: string
  email: string
  role: string
}
export default {
  data() {
    return {
      search: '',
    }
  },
  computed: {
    user(): User | null {
      return apiConnect.user
    },
  },
  methods: {
    handleSearch() {
      apiConnect.get(`/animes?title=${this.search}`)
    },
    handleLogout() {
      apiConnect.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
