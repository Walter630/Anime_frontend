<script lang="ts">
  export default {
    name: 'AnimeView',
    data () {
      return {
        anime: null,
        episodios: [],
      }
    },
    mounted () {
      this.getAnime()
      this.getEpisodios()
    },
    created () {
      this.anime = this.$route.params.id
    },
    methods: {
      getEpisodios () {
        this.episodios = this.$route.params.id
      },
      getAnime () {
        this.anime = this.$route.params.id
      },
    },
  }
</script>

<template>
  <v-container class="pa-6">
    <v-row>
      <v-col cols="12" md="8">
        <v-img :src="anime.image" />
      </v-col>
    </v-row>
    <h3 class="mt-10 mb-4">Episodios</h3>

    <v-row>
      <v-col
        v-for="ep in episodios"
        :key="ep.id"
        cols="6"
        md="3"
        sm="4"
        style="box-shadow: none;"
      >
        <v-card class="pa-2 rounded-lg" elevation="2">
          <v-img class="rounded-lg" cover height="150" :src="ep.image">
            <template #placeholder>
              <v-row
                align="center"
                class="fill-height ma-0"
                justify="center"
              >
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                />
              </v-row>
            </template>
          </v-img>
          <p class="text-subtitle-2 mt-1">{{ ep.title }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>

</style>
