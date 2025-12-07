<template>
  <v-container class="pa-6">
    <!-- Main banner - contain (não corta) -->
    <v-img
      :src="bannerUrl"
      height="300"
      contain
      cover
      class="mb-10 rounded-lg banner-img"
    />

    <h3 class="mb-4">Recomendados para você</h3>

    <v-row>
      <v-col v-for="anime in recommended" :key="anime.id" cols="12" sm="4" md="3">
        <v-card class="anime-card" elevation="0" @click="openAnime(anime.id)">
          <div class="image-container">
            <v-img
              :src="anime.image"
              :alt="anime.title"
              aspect-ratio="1"
              cover
            >
              <template v-slot:placeholder>
                <v-row
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                >
                  <v-progress-circular
                    color="grey-lighten-5"
                    indeterminate
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <!-- Text container -->
          <div class="card-content">
            <p class="text-subtitle-2 anime-title">{{ anime.title }}</p>
            <p class="text-caption">⭐ {{ anime.stars }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Anime {
  id: number
  title: string
  stars: number
  image: string
}

const router = useRouter()

const bannerUrl = ref<string>('/jujutsu.jpg')

const recommended = ref<Anime[]>([
  { id: 1, title: 'Attack on Titan', stars: 5, image: '/myhero.jpg' },
  { id: 2, title: 'Your Name', stars: 5, image: '/sakamotoD.jpg' },
  { id: 3, title: 'Jujutsu Kaisen', stars: 5, image: '/jujutsu.jpg' },
  { id: 4, title: 'Horimiya', stars: 4, image: '/one-punch-man.jpg' },
])

function openAnime(id: number): void {
  router.push(`/anime/${id}`)
}
</script>

<style scoped>
/* Banner styling - contain para não cortar */
.banner-img {
  background-color: #f0f0f0;
  border-radius: 8px;

}

/* Card styling - QUADRADO 200x200px */
.anime-card {
  cursor: pointer;
  width: 100%;
  aspect-ratio: 1; /* Quadrado perfeito */
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

.image-container {
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
}

/* Imagem com contain para não cortar */
.anime-image {
  width: 100%;
  height: 100%;
}

/* Card text content - fixo na base */
.card-content {
  padding: 6px;
  background: white;
  flex-shrink: 0;
}

.anime-title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 0.75rem;
}

/* Banner styling */
.rounded-lg {
  border-radius: 8px;
}
</style>

