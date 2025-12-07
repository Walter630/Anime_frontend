<template>
  <v-container class="pa-6" v-if="anime">
    <v-row style="box-shadow: none;">
      <!-- Poster -->
      <v-col cols="12" md="4">
        <v-img :src="anime.image" height="380" class="rounded-lg" />
      </v-col>

      <!-- Information -->
      <v-col cols="12" md="8" style="box-shadow: none;">
        <h2>{{ anime.title }} <v-icon icon="mdi-heart" size="20" @click="likeAnime(anime.id)" /></h2>

        <p class="text-caption mt-1">⭐ {{ anime.stars }}</p>

        <p class="mt-4">{{ anime.description }}</p>

        <v-btn color="red" class="mt-4" height="40" @click="goToAnime()"> Assistir Anime </v-btn>
        <v-btn color="blue" class="mt-4 ml-4" height="40" @click="goToChat()"> Anime Chat </v-btn>

        <!-- Episodes list -->
        <div class="mt-6">
          <p class="text-subtitle-1 mb-2">Episodes</p>

          <v-list v-if="anime.episodes?.length">
            <v-list-item
              v-for="episode in anime.episodes"
              :key="episode.id"
              prepend-icon="mdi-play-circle-outline"
            >
              <v-list-item-title>{{ episode.title }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <p v-else class="text-grey">No episodes available.</p>
        </div>
      </v-col>
    </v-row>

    <!-- Recommendations -->
    <h3 class="mt-10 mb-4">Recommended</h3>

    <v-row>
      <v-col v-for="recommendation in recommended" :key="recommendation.id" cols="6" sm="4" md="3" style="box-shadow: none;">
        <v-card elevation="2" class="pa-2 rounded-lg">
          <v-img :src="recommendation.image" height="150" class="rounded-lg" cover />
          <p class="text-subtitle-2 mt-1">{{ recommendation.title }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Footer -->
    <div class="text-center mt-10 text-grey">© 2025 AniVerse — All rights reserved.</div>
  </v-container>

  <!-- Screen if ID does not exist -->
  <v-container v-else class="d-flex align-center justify-center" style="height: 70vh">
    <div class="text-center">
      <h2>Anime not found</h2>
      <p class="text-grey">Check the URL or go back to the home page.</p>

      <v-btn color="red" class="mt-4" @click="$router.push('/')"> Back to Home </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Episode {
  id: number
  title: string
}

interface Anime {
  id: number
  title: string
  stars: number
  year: string
  description: string
  image: string
  episodes?: Episode[]
}

// Get ID from URL
const route = useRoute()
const router = useRouter()
const animeId = route.params.id

// Backend simulation
const catalog: Anime[] = [
  {
    id: 1,
    title: 'Attack on Titan',
    stars: 5,
    year: '2013',
    description: 'Humanity faces giant titans.',
    image: '/myhero.jpg',
    episodes: [
      { id: 1, title: 'Episode 1' },
      { id: 2, title: 'Episode 2' },
    ],
  },
  {
    id: 2,
    title: 'Your Name',
    stars: 5,
    year: '2016',
    description: 'Two young people mysteriously swap bodies.',
    image: '/one-punch-man.jpg',
    episodes: [],
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen',
    stars: 5,
    year: '2020',
    description: 'Sorcerers fight curses.',
    image: '/jujutsu.jpg',
    episodes: [
      { id: 1, title: 'Ryoimen Sukuna' },
      { id: 2, title: 'For Myself' },
    ],
  },
]

// State
const anime = ref<Anime | null>(null)

const recommended = ref([
  { id: 99, title: 'Steins;Gate', image: '/sakamoto.png' },
  { id: 98, title: 'Re:Zero', image: '/rz.jpg' },
  { id: 97, title: 'Konosuba', image: '/kono.jpg' },
])

function goToChat(): void {
  router.push(`/anime/${animeId}/chat`)
}

// Load the correct anime
onMounted(() => {
  anime.value = catalog.find((a) => a.id == Number(animeId)) || null
})

function goToAnime(): void {
  router.push(`/video/${animeId}`)
}

function likeAnime(id: number): void {
  console.log(`Like anime ${id}`)
}

</script>
