<template>
  <v-container class="login-wrapper d-flex align-center justify-center">
    <v-card class="login-card pa-8 d-flex flex-column align-center" elevation="0">
      <div class="text-center mb-6">
        <img alt="Logo" src="/LogoAniverseVERMELHAPARAFOOTER.png" width="140">
        <p class="text-subtitle-2 mt-1">Bem-vindo de volta</p>
      </div>

      <v-form class="w-100 d-flex flex-column align-center" @submit.prevent="login">
        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="email"
            class="mb-4"
            density="comfortable"
            placeholder="Email"
            required
            type="email"
            variant="outlined"
          />
        </div>

        <div class="w-100">
          <label class="field-label">Password</label>
          <v-text-field
            v-model="password"
            class="mb-6"
            density="comfortable"
            placeholder="Password"
            required
            type="password"
            variant="outlined"
          />
        </div>

        <v-btn
          block
          append-icon="mdi-arrow-right"
          class="login-btn mb-4"
          height="42"
          type="submit"
        >
          SIGN IN
        </v-btn>

        <p class="text-subtitle-2 mb-2">Don't have an account yet?</p>

        <v-btn
          block
          color="black"
          height="42"
          variant="tonal"
          @click="$router.push('/register')"
        >
          CREATE ACCOUNT
        </v-btn>
      </v-form>

      <p class="mt-8 text-caption">Terms of Use | Privacy Policy</p>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import type { LoginRequest, LoginResponse } from '@/plugins/apiConnect.ts'

  export default {
    name: 'LoginPage',
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login () {
        try {
          const response = await this.$api.post<LoginResponse>('/auth/login', {
            email: this.email,
            password: this.password,
          } as LoginRequest)

          if (response.data) {
            // Save access token (refresh token comes via HTTP-only cookie) and user info in the store
            this.$api.setToken(response.data.accessToken)
            // Save user info in the store
            this.$store.setUser(response.data.user)
            // Redirect based on user role
            this.$router.push('/')
          }
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },
    },
  }
</script>

<style scoped>
/* General background */
.login-wrapper {
  background: #f1dfc2;
  min-height: 100vh;
  width: 100%;
}

/* Central card */
.login-card {
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
.login-btn {
  background-color: #f44336;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
