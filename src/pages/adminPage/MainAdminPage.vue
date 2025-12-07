<script lang="ts">

export default {
  name: 'MainAdminPage',
  data() {
    return {
      users: [],
      animes: [],
    }
  },
  mounted() {
    this.getUsers()
    this.getAnimes()
  },
  methods: {
    getUsers() {
      this.users = this.$route.params.id
    },
    getAnimes() {
      this.animes = this.$route.params.id
    }
  }
}Regis

</script>

<template>
  <v-container class="pa-6">
    <h1>Painel do Administrador</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card background-color="red" class="pa-2 rounded-lg">
          Usuarios
          <v-icon icon="mdi-account" size="20" @click="addUser()"></v-icon>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card background-color="blue" class="pa-2 rounded-lg">
          Animes
          <v-icon icon="mdi-plus" size="20" @click="addAnime()"></v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
