<script lang="ts">
  import { apiConnect } from "@/plugins/apiConnect.ts"; // sua API

  interface Video {
    id: string
    animeId: string // ID do anime, não objeto
    numero: number
    titulo: string
    video_url: string
  }

  interface AnimeData {
    id: string
    name: string
    image: string
    sinopse: string
  }

  export default {
    name: 'AnimeView',
    data () {
      return {
        anime: null as AnimeData | null,
        episodios: [] as Video[],
        loading: true,
        videoUrl: '' as string,
        showVideoPlayer: false
      }
    },

    async mounted () {
      const animeId = this.$route.params.id as string
      await Promise.all([
        this.getAnime(animeId),
        this.getEpisodios(animeId)
      ])
      this.loading = false
    },

    methods: {
      async getAnime (animeId: string) {
        try {
          const response = await apiConnect.get(`/anime/${animeId}`)
          this.anime = response.data // ou response.data.anime
        } catch (error) {
          console.error('Erro ao buscar anime:', error)
        }
      },

      async getEpisodios (animeId: string) {
        try {
          const response = await apiConnect.get(`/anime/${animeId}/episodes`)
          this.episodios = response.data
        } catch (error) {
          console.error('Erro ao buscar episódios:', error)
        }
      },

      // ✅ ABRIR PLAYER DE VÍDEO
      playEpisode (episode: Video) {
        this.videoUrl = episode.video_url
        this.showVideoPlayer = true
      },

      closeVideoPlayer () {
        this.showVideoPlayer = false
        this.videoUrl = ''
      }
    }
  }
</script>

<template>
  <v-container class="pa-6">
    <!-- Loading -->
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- Conteúdo principal -->
    <div v-else>
      <!-- Poster do Anime -->
      <v-row>
        <v-col cols="12" md="8">
          <v-img
            v-if="anime?.image"
            :src="anime.image"
            height="400"
            class="rounded-lg"
            cover
          />
        </v-col>
      </v-row>

      <!-- Lista de Episódios -->
      <h3 class="mt-10 mb-4">Episódios ({{ episodios.length }})</h3>

      <v-row v-if="episodios.length">
        <v-col
          v-for="ep in episodios"
          :key="ep.id"
          cols="6"
          md="3"
          sm="4"
        >
          <v-card
            class="pa-2 rounded-lg episode-card"
            elevation="2"
            @click="playEpisode(ep)"
          >
            <v-img
              class="rounded-lg"
              cover
              height="150"
              src="/jujutsu.jpg"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular color="grey-lighten-5" indeterminate />
                </v-row>
              </template>
            </v-img>

            <div class="episode-info">
              <p class="text-subtitle-2 font-weight-bold mb-1">Ep {{ ep.numero }}</p>
              <p class="text-caption mb-0">{{ ep.titulo }}</p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p v-else class="text-grey text-center pa-10">
        Nenhum episódio disponível ainda.
      </p>
    </div>

    <!-- VIDEO PLAYER MODAL -->
    <v-dialog v-model="showVideoPlayer" max-width="90%" persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>Assistindo Episódio</span>
          <v-btn icon @click="closeVideoPlayer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <!-- VIDEO PLAYER RESPONSIVO -->
          <video
            v-if="videoUrl"
            :src="videoUrl"
            controls
            autoplay
            class="w-100"
            style="max-height: 70vh; width: 100%;"
          >
            Seu navegador não suporta vídeo HTML5.
          </video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.episode-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.episode-card:hover {
  transform: translateY(-4px);
}

.episode-info {
  padding: 8px;
}

video {
  border-radius: 8px;
}
</style>
