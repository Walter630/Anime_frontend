<template>
  <v-container class="pa-3">
    <!-- Main banner - contain (no cropping) -->
    <v-img
      :src="bannerUrl"
      height="300"
      cover
      aspect-ratio="1"
      class="mb-10"
    />

    <h3 class="mb-4">Voce pode gostar</h3>

    <v-row>
      <v-col v-for="anime in recommended" :key="anime.id" cols="12" sm="6" md="3" class="d-flex justify-center">
        <v-card class="anime-card" elevation="0" @click="openAnime(anime.id)">
          <div >
            <v-img
              :src="anime.image"
              :alt="anime.title"
              height="140"
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

            <!-- Star rating: show 5 stars, filled according to anime.stars -->
            <div class="star-row" aria-label="rating">
              <v-icon
                v-for="i in 5"
                :key="i"
                :color="starColor(i - 1, anime.stars)"
                class="star-icon"
                aria-hidden="true"
              >
                {{ starIcon(i - 1, anime.stars) }}
              </v-icon>
            </div>
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

// Helper to choose star icon (filled or outline)
function starIcon(index: number, stars: number): string {
  const value = Math.round(stars)
  return index < value ? 'mdi-star' : 'mdi-star-outline'
}

// Helper to choose star color
function starColor(index: number, stars: number): string {
  const value = Math.round(stars)
  return index < value ? 'amber darken-2' : 'grey lighten-1'
}
</script>


<style scoped>
/* Banner styling - contain so it doesn't crop */
.banner-img {
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

/* Card styling - constrained to 200x200px */
.anime-card {
  cursor: pointer;
  width: 200px;
  height: 200px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

/* Card text content - fixed at base */
.card-content {
  padding: 6px;
  background: white;
  flex-shrink: 0;
  height: 60px;
  box-sizing: border-box;
}

.anime-title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 0.75rem;
}

/* Stars row and icon sizing */
.star-row {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 4px;
}

.star-icon {
  font-size: 18px;
  line-height: 1;
}

/* Banner styling */
.rounded-lg {
  border-radius: 8px;
}
</style>
