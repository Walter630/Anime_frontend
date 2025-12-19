<script lang="ts">
  import { apiConnect } from '@/plugins/apiConnect'

  interface Video {
    id: string
    numero: number
    titulo: string
    video_url: string
  }

  interface AnimeData {
    id: string
    name: string
    imagem: string
    sinopse: string
    videos: string[]
  }

  export default {
    name: 'AnimeView',

    data () {
      return {
        anime: null as AnimeData | null,
        episodios: [] as Video[],
        loading: true,

        showVideoPlayer: false,
        videoUrl: '' as string,
      }
    },

    async mounted () {
      const animeId = this.$route.params.id as string

      await Promise.all([
        this.getAnime(animeId),
      ])

      this.loading = false
    },

    methods: {
      async getAnime (animeId: string) {
        try {
          const response = await this.$api.get(`/${animeId}/plays`)

          this.episodios = (response.data || []).map(
            (url: string, index: number) => ({
              id: String(index),
              numero: index + 1,
              titulo: `Episódio ${index + 1}`,
              video_url: url,
            })
          )

        } catch (error) {
          console.error('Erro ao buscar episódios:', error)
        }
      },


      playEpisode (episode: Video) {
        this.videoUrl = episode.video_url
        this.showVideoPlayer = true
      },

      closeVideoPlayer () {
        this.showVideoPlayer = false
        this.videoUrl = ''
      },

      isYouTube (url?: string) {
        if (!url) return false
        return url.includes('youtube.com') || url.includes('youtu.be')
      },

      isGoogleDrive (url?: string) {
        if (!url) return false
        return url.includes('drive.google.com')
      },


      getYouTubeEmbed (url: string) {
        if (url.includes('youtu.be')) {
          return url.replace('youtu.be/', 'www.youtube.com/embed/')
        }
        return url.replace('watch?v=', 'embed/')
      },

      getDriveEmbed (url: string) {
        return url.includes('/preview')
          ? url
          : url.replace('/view', '/preview')
      },
    },
  }
</script>

<template>
  <v-container class="pa-6">
    <!-- LOADING -->
    <div v-if="loading" class="text-center pa-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <!-- CONTEÚDO -->
    <div v-else>
      <!-- IMAGEM DO ANIME -->
      <v-row>
        <v-col cols="12" md="8">
          <v-img
            v-if="anime?.imagem"
            :src="anime.imagem"
            height="400"
            cover
            class="rounded-lg"
          />
        </v-col>
      </v-row>

      <!-- SINOPSE -->
      <v-row class="mt-4">
        <v-col cols="12" md="8">
          <p>{{ anime?.sinopse }}</p>
        </v-col>
      </v-row>

      <!-- EPISÓDIOS -->
      <h3 class="mt-10 mb-4">
        Episódios ({{ episodios.length }})
      </h3>

      <v-row v-if="episodios.length">
        <v-col
          v-for="ep in episodios"
          :key="ep.id"
          cols="6"
          sm="4"
          md="3"
        >
          <v-card
            class="episode-card pa-2"
            elevation="2"
            @click="playEpisode(ep)"
          >
            <v-img
              height="150"
              cover
              src="/jujutsu.jpg"
              class="rounded-lg"
            />

            <div class="episode-info">
              <p class="text-subtitle-2 font-weight-bold">
                Ep {{ ep.numero }}
              </p>
              <p class="text-caption">
                {{ ep.titulo }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <p v-else class="text-center pa-10">
        Nenhum episódio disponível.
      </p>
    </div>

    <!-- PLAYER -->
    <v-dialog
      v-model="showVideoPlayer"
      max-width="90%"
      attach="body"
      scroll-strategy="none"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span>Assistindo Episódio</span>
          <v-btn icon @click="closeVideoPlayer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0" v-if="videoUrl">
          <iframe
            v-if="isYouTube(videoUrl)"
            :src="getYouTubeEmbed(videoUrl)"
            width="100%"
            height="500"
            allowfullscreen
          />

          <iframe
            v-else-if="isGoogleDrive(videoUrl)"
            :src="getDriveEmbed(videoUrl)"
            width="100%"
            height="500"
            allow="autoplay"
          />

          <video
            v-else
            :src="videoUrl"
            controls
            autoplay
            class="w-100"
            style="max-height: 70vh;"
          />
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
