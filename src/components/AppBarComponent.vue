<template>
  <v-app-bar
    color="white"
    flat
    height="72"
    class="px-4"
  >
    <!-- LOGO -->
    <img

      alt="Logo"
      style="width: 150px; height: auto; cursor: pointer;"
      @click="$router.push('/')"
    />

    <v-spacer />

    <!-- BARRA DE PESQUISA -->
    <v-text-field
      v-model="pesquisa"
      placeholder="Pesquisar animes..."
      variant="outlined"
      density="comfortable"
      hide-details
      style="max-width: 450px;"
      class="mx-4"
      prepend-inner-icon="mdi-magnify"
    />

    <v-spacer />

    <!-- AVATAR / MENU DO USUÁRIO -->
    <v-menu>
      <template #activator="{ props }">
        <v-avatar
          v-bind="props"
          size="42"
          class="cursor-pointer"
        >
          <img  alt="Avatar" />
        </v-avatar>
      </template>

      <v-list>
        <v-list-item @click="$router.push('/perfil')">
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$router.push('/perfil')">
          <v-list-item-title>Meus Animes</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { ref } from "vue";


export default {
  name: "AppBarComponent",
  data() {
    return {
      pesquisa: ""
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    onMounted() {
      this.$router.push('/login');
    },
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
