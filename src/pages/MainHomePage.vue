<template>
  <v-container class="pa-3">
    <!-- Main banner - contain (no cropping) -->
    <v-img
      aspect-ratio="1"
      class="mb-10"
      cover
      height="300"
      :src="bannerUrl"
    />

    <h3 class="mb-4">Você pode gostar</h3>

    <!-- Loading state -->
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Error state -->
    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Animes list -->
    <v-row v-else>
      <v-col
        v-for="anime in recommended"
        :key="anime.id"
        class="d-flex justify-center"
        cols="12"
        md="3"
        sm="6"
      >
        <v-card class="anime-card" elevation="0" @click="openAnime(anime.id)">
          <v-img
            :alt="anime.name"
            aspect-ratio="1"
            cover
            height="140"
            :src="anime.image"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate />
              </v-row>
            </template>
          </v-img>

          <div class="card-content">
            <p class="text-subtitle-2 anime-title">{{ anime.name }}</p>
            <div class="star-row">
              <v-rating
                hover
                :length="5"
                :size="32"
                :model-value="3"
                active-color="yellow darken-3"
              />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  interface Anime {
    id: string
    name: string
    stars: number
    image: string
    sinopse: string
    dataLancamento?: string
    genero?: string[]
    videos?: string[]
  }

  export default defineComponent({
    name: 'MainHomePage',

    data () {
      return {
        bannerUrl: '/myhero.jpg' as string,
        recommended: [] as Anime[],
        loading: true as boolean,
        error: '' as string,
      }
    },

    async mounted () {
      await this.getAnimes()
    },

    methods: {
      async getAnimes () {
        try {
          this.loading = true
          this.error = ''
          const response = await this.$api.get<Anime[]>('/anime/findAll')
          console.log('✅ ANIMES RESPONSE:', response.data)
          if (response.status === 200) {
            this.recommended = response.data
          }
        } catch (error) {
          console.error('❌ ERROR FETCHING ANIMES:', error)
          this.error = 'Erro ao buscar Animes'
          this.recommended = []
        } finally {
          this.loading = false
        }
      },

      openAnime (id: string) {
        this.$router.push(`/anime/${id}`)
      },

      starIcon (index: number, rating: number) {
        if (rating >= index + 1) return 'mdi-star'
        if (rating >= index + 0.5) return 'mdi-star-half-full'
        return 'mdi-star-outline'
      },

      starColor (index: number, rating: number) {
        return rating >= index + 0.5 ? 'yellow darken-3' : 'grey lighten-1'
      },
    },
  })
</script>

<style scoped>
.anime-card {
  cursor: pointer;
  width: 200px;
  height: 200px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

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
</style>
