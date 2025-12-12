<template>
  <v-container class="py-10" style="max-width: 600px">
    <div class="text-center mb-6">
      <v-avatar class="mb-3" size="90">
        <img :src="user?.avatar">
      </v-avatar>
      <v-icon class="edit-btn" icon="mdi-pencil-outline" size="20" @click="editFoto()" />
    </div>
    <v-sheet class="mx-auto" width="400">
      <v-form class="mt-4" @submit.prevent>
        <p>Novo nome</p>
        <v-text-field v-model="fullName" class="mb-4" variant="outlined" />
        <p>Novo email</p>
        <v-text-field v-model="newEmail" class="mb-4" variant="outlined" />
        <p>Nova senha</p>
        <v-text-field v-model="newPassword" class="mb-4" type="password" variant="outlined" />

        <v-btn
          block
          class="mb-4"
          color="red"
          height="48"
          @click="handleSave"
        > Save Changes </v-btn>
        <v-btn block color="black" height="48" @click="$router.push('/profile')">
          Cancel
        </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
  import { apiConnect } from '@/plugins/apiConnect'

  export default {
    data () {
      return {
        fullName: '',
        newEmail: '',
        newPassword: '',
      }
    },
    computed: {
      user (): User | null {
        return apiConnect.user
      },
    },
    methods: {
      handleSave () {
        try {
          apiConnect.put(`/users/${apiConnect.user?.id}`, {
            username: this.fullName,
            email: this.newEmail,
            password: this.newPassword,
          })
          this.$router.push('/profile')
        } catch (error) {
          console.log(error)
        }
      },
      editFoto () {
        console.log('Foto editada')
      },

    },
  }
</script>
