<template>
  <v-container class="pa-6">

    <!-- Banner principal -->
    <v-card
      height="350"
      class="mb-10"
      rounded="lg"
      :style="`background-image: url(${bannerUrl}); background-size: cover; background-position: center;`"
    />

    <!-- Você também pode gostar -->
    <h3 class="mb-4">Você também pode gostar</h3>

    <v-row>
      <v-col v-for="anime in recomendados" :key="anime.id" cols="6" sm="4" md="3">
        <v-card rounded="lg" class="pa-2" elevation="2" @click="abrirAnime(anime.id)">
          <v-img :src="anime.img" height="180" class="rounded-lg" cover/>
          <p class="text-subtitle-2 mt-2">{{ anime.titulo }}</p>
          <p class="text-caption">⭐ {{ anime.stars }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "HomeComponent",
  data() {
    return {
      bannerUrl: "/jujutsu.jpg",
      recomendados: [
        { id: 1, titulo: "Attack on Titan", stars: 5, img: "/myhero.jpg" },
        { id: 2, titulo: "Your Name", stars: 5, img: "/sakamotoD.jpg" },
        { id: 3, titulo: "Jujutsu Kaisen", stars: 5, img: "/jujutsu.jpg" },
        { id: 4, titulo: "Horimiya", stars: 4, img: "/one-punch-man.jpg" }
      ],
      router: useRouter()
    };
  },
  methods: {
    abrirAnime(id) {
      this.router.push(`/anime/${id}`);
    }
  }
};
</script>
