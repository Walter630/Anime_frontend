<script lang="ts">

  export default {
    name: 'MainAdminPage',
    data () {
      return {}
    },
  }

</script>

<template>
  <v-container class="pa-6">
    <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Painel do Administrador</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-2" style="height: 300px; background-color: red;" @click="$router.push('/admin/register-users')">
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <h1 style="color: white; font-size: 20px; font-weight: bold;">USUÁRIOS</h1>
            <v-icon icon="mdi-account-outline" size="60" style="display: flex; justify-content: center; align-items: center;" />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2" style="height: 300px; background-color: red;" @click="$router.push('/admin/register-animes')">
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <h1 style="color: white; font-size: 20px; font-weight: bold;">ANIMES</h1>
            <v-icon icon="mdi-movie-play-outline" size="60" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <router-view />
</template>

<style scoped>

</style>
