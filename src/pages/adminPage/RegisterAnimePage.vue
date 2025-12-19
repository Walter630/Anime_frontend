<script lang="ts">
  import type { Anime } from '@/plugins/apiConnect.ts'
  export default {
    name: 'RegisterAnimePage',
    data () {
      return {
        formData: {
          name: '',
          imagem: '',
          sinopse: '',
          genero: '',
          dataLancamento: '',
          status: '',
          favorito: false,
          videosText: '', // campo auxiliar
        },
        textSucesso: 'Anime registrado com sucesso!',
        snackbar: false,
      }
    },
    computed: {
      isFormValid (): boolean {
        return (
          this.formData.name.trim() !== ''
          && this.formData.imagem.trim() !== ''
          && this.formData.sinopse.trim() !== ''
          && this.formData.genero.trim() !== ''
          && this.formData.dataLancamento.trim() !== ''
          && this.formData.status.trim() !== ''
        )
      },
    },
    methods: {
      async createAnimePage () {
        try {
          const payload = {
            ...this.formData,
            videos: this.formData.videosText
              .split(',')
              .map(v => v.trim())
              .filter(v => v.length > 0),
          }

          const response = await this.$api.post('/anime/register', payload)
          console.log(response)
          if (response.status === 200) {
            console.log('Anime registrado:', response.data)
            this.textSucesso = 'Anime registrado com sucesso!'
            this.snackbar = true
            await this.$router.push('/home')
          }
        } catch (error) {
          console.error('Erro ao registrar anime:', error)
        }
      },
    },
  }
</script>

<template>
  <v-container class="pa-6">
    <h1>Register Anime</h1>

    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="formData.name" label="Name" required />
      <v-text-field v-model="formData.imagem" label="Imagem URL" required />
      <v-textarea v-model="formData.sinopse" label="Sinopse" required />
      <v-text-field v-model="formData.genero" label="Gênero" required />
      <v-text-field v-model="formData.dataLancamento" label="Data de Lançamento" required />

      <v-select
        v-model="formData.status"
        :items="['Em andamento', 'Completo', 'Cancelado']"
        label="Status"
        required
      />

      <v-checkbox v-model="formData.favorito" label="Favorito" />

      <v-text-field
        v-model="formData.videosText"
        label="Vídeos (separados por vírgula)"
      />

      <v-btn class="mt-4" color="primary" @click="createAnimePage">
        Registrar Anime
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar">
      {{ textSucesso }}
      <template #actions>
        <v-btn color="green" text @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>

</template>

<style scoped>

</style>
