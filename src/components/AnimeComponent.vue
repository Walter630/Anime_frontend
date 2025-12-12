<template>
  <v-container v-if="anime" class="pa-6">
    <v-row style="box-shadow: none;">
      <!-- Poster -->
      <v-col cols="12" md="4">
        <v-img class="rounded-lg" height="380" :src="anime.image" />
      </v-col>

      <!-- Information -->
      <v-col cols="12" md="8" style="box-shadow: none;">
        <h2>
          {{ anime.title }}
          <v-icon icon="mdi-heart" size="20" @click="likeAnime(anime.id)" />
        </h2>

        <!-- Star rating: show 5 stars, filled according to average, clickable to set user's rating -->
        <div aria-label="rating" class="star-row">
          <v-icon
            v-for="i in 5"
            :key="i"
            aria-hidden="true"
            class="star-icon clickable"
            :color="starColorFor(anime.id, i - 1)"
            @click="onStarClick(i, anime.id)"
          >
            {{ starIconFor(anime.id, i - 1) }}
          </v-icon>

          <span class="text-caption ml-2">({{ ratings[anime.id]?.count || 0 }} ratings)</span>
        </div>

        <p class="mt-4">{{ anime.description }}</p>

        <v-btn class="mt-4" color="red" height="40" @click="goToAnime()"> Watch Anime </v-btn>
        <v-btn class="mt-4 ml-4" color="blue" height="40" @click="goToChat()"> Anime Chat </v-btn>

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
      <v-col
        v-for="recommendation in recommended"
        :key="recommendation.id"
        cols="6"
        md="3"
        sm="4"
        style="box-shadow: none;"
      >
        <v-card class="pa-2 rounded-lg" elevation="0" @click="openAnime(recommendation.id)">
          <v-img class="rounded-lg" cover height="150" :src="recommendation.image" />
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

      <v-btn class="mt-4" color="red" @click="$router.push('/')"> Back to Home </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
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

  // Ratings store (in-memory) with optional per-user rating.
  // Structure: { [animeId]: { count: number; sum: number; userRating?: number } }
  const ratings = ref<Record<number, { count: number, sum: number, userRating?: number }>>({})

  // Initialize ratings from the catalog. We seed each anime with one rating equal to its stars so averages show a reasonable starting value.
  function initializeRatings () {
    for (const a of catalog) {
      // try restore user rating from localStorage
      const saved = localStorage.getItem(`rating_${a.id}`)
      const userRating = saved ? Number(saved) : undefined

      // seed count with 1 so we don't divide by zero and the average approximates the provided stars
      ratings.value[a.id] = {
        count: 1,
        sum: a.stars,
        userRating,
      }
    }
  }

  onMounted(() => {
    initializeRatings()
    anime.value = catalog.find(a => a.id == Number(animeId)) || null
  })

  function getAverage (animeId: number): number {
    const r = ratings.value[animeId]
    if (!r || r.count === 0) return 0
    return r.sum / r.count
  }

  function getAverageRounded (animeId: number): number {
    return Math.round(getAverage(animeId))
  }

  function starIconFor (animeId: number, index: number): string {
    const value = getAverageRounded(animeId)
    return index < value ? 'mdi-star' : 'mdi-star-outline'
  }

  function starColorFor (animeId: number, index: number): string {
    const value = getAverageRounded(animeId)
    return index < value ? 'amber darken-2' : 'grey lighten-1'
  }

  // User clicks a star to submit/update rating
  function onStarClick (starValue: number, animeId: number): void {
    const r = ratings.value[animeId]
    if (!r) return

    const previous = r.userRating
    if (previous) {
      // user already rated: update sum
      r.sum = r.sum - previous + starValue
      r.userRating = starValue
    } else {
      // first time rating by this user
      r.count = r.count + 1
      r.sum = r.sum + starValue
      r.userRating = starValue
    }

    // persist the user's selection locally
    try {
      localStorage.setItem(`rating_${animeId}`, String(starValue))
    } catch (error) {
      console.warn('Could not persist rating', error)
    }
  }

  function goToChat (): void {
    router.push(`/anime/${animeId}/chat`)
  }

  // Load the correct anime
  onMounted(() => {
    anime.value = catalog.find(a => a.id == Number(animeId)) || null
  })

  function goToAnime (): void {
    router.push(`/video/${animeId}`)
  }

  function likeAnime (id: number): void {
    console.log(`Like anime ${id}`)
  }

  function openAnime (id: number): void {
    router.push(`/anime/${id}`)
  }

</script>

<style scoped>
/* clickable stars */
.clickable {
  cursor: pointer;
}

/* keep other minor style hints */
.star-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.star-icon {
  font-size: 22px;
}
</style>
