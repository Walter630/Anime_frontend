<script lang="ts">
  import { apiConnect } from '@/plugins/apiConnect.ts'

  interface User {
    id: string
    name: string
    email: string
    role: string
  }
  export default {
    name: 'RegisterAnimePage',
    data () {
      return {
        users: [] as User[],
      }
    },
    mounted () {
      this.getUsers()
      this.edit()
      this.delete()
    },
    methods: {
      getUsers () {
        apiConnect.get('/users').then(response => {
          this.users = response.data
        })
      },
      async edit () {
        await apiConnect.put('/users/' + this.user.id, this.user).then(response => {
          this.$router.push('/users')
        })
      },
      async delete () {
        await apiConnect.delete('/users/' + this.user.id).then(response => {
          this.$router.push('/users')
        })
      },
    },
  }
</script>

<template>
  <v-container class="pa-6">
    <h1>Usuarios</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.id" cols="12" md="6">
        <v-card class="pa-2 rounded-lg" style="display: flex; flex-direction: column; align-items: center;">
          <v-img class="rounded-lg" cover height="150" :src="user.imagem" />
          <p class="text-subtitle-2 mt-1">{{ user.name }}</p>
          <p class="text-subtitle-2 mt-1">{{ user.email }}</p>
          <p class="text-subtitle-2 mt-1">{{ user.role }}</p>
          <v-icon icon="mdi-pencil" size="20" @click="edit()" />
          <v-icon icon="mdi-delete" size="20" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
