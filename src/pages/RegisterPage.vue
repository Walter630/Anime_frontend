<template>
  <v-container class="register-wrapper d-flex align-center justify-center pa-0" fluid>
    <v-card class="register-card pa-8 d-flex flex-column align-center" elevation="4">
      <div class="text-center mb-6">
        <img alt="Logo" src="/LogoAniverseVERMELHAPARAFOOTER.png" width="140">
        <p class="text-subtitle-2 mt-1">Fill in your details</p>
      </div>

      <v-form class="w-100 d-flex flex-column align-center" @submit.prevent="register">
        <!-- Name -->
        <div class="w-100">
          <label class="field-label">Name</label>
          <v-text-field
            v-model="formData.name"
            class="mb-2"
            density="comfortable"
            placeholder="Name"
            required
            variant="outlined"
          />
        </div>

        <!-- Email -->
        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="formData.email"
            class="mb-2"
            density="comfortable"
            placeholder="Email"
            required
            type="email"
            variant="outlined"
          />
        </div>

        <!-- Password -->
        <div class="w-100">
          <label class="field-label">Password</label>
          <v-text-field
            v-model="formData.password"
            class="mb-4"
            density="comfortable"
            placeholder="Password"
            required
            type="password"
            variant="outlined"
          />
        </div>

        <!-- Register button -->
        <v-btn block class="register-btn mb-4" height="42" type="submit"> SIGN UP </v-btn>

        <div style="align-items: start">
          <p style="text-align: start">Already have an account?</p>
        </div>

        <!-- Back to login -->
        <v-btn block height="42" variant="tonal" @click="$router.push('/login')">
          SIGN IN
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import type { User } from '@/plugins/apiConnect'
  export default {
    name: 'RegisterPage',
    data () {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
          active: true,
        },
      }
    },
    // component lifecycle ele é o hook que é chamado quando o component é montado e acesso ao DOM

    methods: {
      async register () {
        try {
          const response = await this.$api.post<User>('/auth/register', this.formData)
          if (response.status === 201) {
            console.log('Usuário registrado com sucesso:', response.data)
            this.$router.push('/login')
          } else {
            console.log('Erro no registro:', response)
          }
        } catch (error) {
          console.error('Erro no registro:', error)
          alert('Erro no registro: ' + error)
        }
      },
    },
  }
</script>

<style scoped>
/* General background */
.register-wrapper {
  background: #f1dfc2;
  min-height: 100vh;
  width: 100%;
}

/* Central card */
.register-card {
  width: 460px;
  border-radius: 12px;
}

/* Labels */
.field-label {
  font-size: 14px;
  font-weight: 600;
  margin-left: 3px;
  margin-bottom: 4px;
  display: block;
}

/* Main button */
.register-btn {
  background-color: #f44336;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
