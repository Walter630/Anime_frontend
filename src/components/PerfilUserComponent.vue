<template>
  <v-container class="py-6">

    <!-- Banner -->
    <v-img
      :src="banner"
      height="240"
      cover
      class="rounded-lg mb-6"
    />

    <!-- Perfil -->
    <div class="text-center mb-8">
      <v-avatar size="90" class="mb-3">
        <img :src="foto" />
      </v-avatar>

      <h2 class="font-weight-bold">Fulaninho_xd</h2>

      <div class="mt-2 d-flex justify-center" style="gap: 20px;">
        <div class="text-center">
          <v-icon color="red" size="24">mdi-heart</v-icon>
          <p class="mt-1 text-caption">Favoritos</p>
        </div>

        <div class="text-center">
          <v-icon color="black" size="24">mdi-book-open-page-variant</v-icon>
          <p class="mt-1 text-caption">Recentes</p>
        </div>
      </div>
    </div>

    <!-- Lista de animes -->
    <h3 class="text-h6 mb-3">Favoritos</h3>

    <v-row>
      <v-col cols="6" md="3" v-for="anime in lista" :key="anime.id">
        <v-card elevation="2" class="rounded-lg">
          <v-img :src="anime.img" height="200" cover />
          <p class="pa-2 text-center text-subtitle-2">{{ anime.titulo }}</p>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: "PerfilUserComponent",
  data() {
    return {
      banner: "/jujutsu.jpg",
      foto: "/perfil.png",
      lista: [
        { id: 1, titulo: "Jujutsu Kaisen", img: "/animes/jjk.jpg" },
        { id: 2, titulo: "AOT", img: "/animes/aot.jpg" },
        { id: 3, titulo: "Your Name", img: "/animes/yn.jpg" },
        { id: 4, titulo: "Konosuba", img: "/animes/kono.jpg" }
      ]
    };
  }
};
</script>
