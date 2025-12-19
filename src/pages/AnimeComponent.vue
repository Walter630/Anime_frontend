<template>
  <v-container v-if="anime" class="pa-6">
    <v-row style="box-shadow: none;">
      <!-- Poster -->
      <v-col cols="12" md="4">
        <v-img class="rounded-lg" height="380" :src="anime.imagem" />
      </v-col>

      <!-- Information -->
      <v-col cols="12" md="8" style="box-shadow: none;">
        <h2>
          {{ anime.name }}
          <v-icon icon="mdi-heart" size="20" @click="likeAnime(anime.id)" />
        </h2>

        <!-- Star rating: show 5 stars, filled according to average, clickable to set user's rating -->
        <div aria-label="rating" class="star-row">
          <v-rating
            hover
            :length="5"
            :size="32"
            :model-value="3"
            active-color="yellow darken-3"
          />

          <span class="text-caption ml-2">({{ ratings[anime.id]?.count || 0 }} ratings)</span>
        </div>

        <p class="mt-4">{{ anime.sinopse }}</p>

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
          <v-img class="rounded-lg" cover height="150" :src="recommendation.imagem" />
          <p class="text-subtitle-2 mt-1">{{ recommendation.name }}</p>
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

      <v-btn class="mt-4" color="red" @click="$router.push('/home')"> Back to Home </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
  import { apiConnect } from "@/plugins/apiConnect.ts";

  interface Episode {
    id: number
    title: string
  }

  interface Anime {
    id: string
    name: string
    sinopse: string
    genero: string
    dataLancamento: string
    status: string
    imagem: string
    favorito: boolean
    episodes?: Episode[]
  }

  export default {
    data () {
      return {
        anime: null as Anime | null,
        recommended: [] as Anime[],
        ratings: {} as Record<number, { userRating: number; count: number }>,
      }
    },
    async mounted () {
      await this.fetchAnime()
      await this.getAllAnime()
    },
    methods: {
      async fetchAnime () {
        const animeId = this.$route.params.id as string
        console.log(animeId)
        try {
          const response = await apiConnect.get(`/anime/${animeId}`)
          console.log(response)
          if (response.data.anime) {
            this.anime = response.data.anime

            this.ratings = response.data.ratings || {}
          } else {
            this.anime = response.data[0] || null
            this.ratings = {}
          }
          console.log(this.anime?.name)
          console.log(this.anime)
        } catch (error) {
          console.error('Error fetching anime data:', error)
        }
      },
      async getAllAnime () {
        try {
          const response = await this.$api.get<Anime[]>(`/anime/getAll`)
          if (response.status === 200) {
            this.recommended = response.data
          }
        } catch (error) {
          console.error('Error fetching anime:', error)
        }
      },
      async likeAnime (animeId: string) {
        try {
          await apiConnect.post(`/anime/${animeId}/like`)
          if (this.anime) {
            this.anime.favorito = !this.anime.favorito
          }
        } catch (error) {
          console.error('Error liking anime:', error)
        }
      },
      goToAnime () {
        if (this.anime) {
          this.$router.push(`/video/${this.anime.id}`)
        }
      },
      goToChat () {
        if (this.anime) {
          this.$router.push(`/chat/${this.anime.id}`)
        }
      },
      openAnime (animeId: string) {
        this.$router.push(`/anime/${animeId}`)
      },
    },
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
