<template>
  <v-container class="login-wrapper d-flex align-center justify-center">
    <v-card class="login-card pa-8 d-flex flex-column align-center" elevation="0">
      <div class="text-center mb-6">
        <img alt="Logo" width="140" />
        <p class="text-subtitle-2 mt-1">Welcome back</p>
      </div>

      <v-form @submit.prevent="handleLogin" class="w-100 d-flex flex-column align-center">
        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="email"
            type="email"
            variant="outlined"
            density="comfortable"
            placeholder="Email"
            class="mb-4"
            required
          />
        </div>

        <div class="w-100">
          <label class="field-label">Password</label>
          <v-text-field
            v-model="password"
            type="password"
            variant="outlined"
            density="comfortable"
            placeholder="Password"
            class="mb-6"
            required
          />
        </div>

        <v-btn type="submit" class="login-btn mb-4" height="42" block append-icon="mdi-arrow-right">
          SIGN IN
        </v-btn>

        <p class="text-subtitle-2 mb-2">Don't have an account yet?</p>

        <v-btn
          variant="tonal"
          height="42"
          block
          color="black"
          @click="$router.push('/register')"
        >
          CREATE ACCOUNT
        </v-btn>
      </v-form>

      <p class="mt-8 text-caption">Terms of Use | Privacy Policy</p>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/hooks/useAuth'

const router = useRouter()
const { login: authLogin, loading, error: authError } = useAuth()

const email = ref<string>('')
const password = ref<string>('')
const valid = ref<boolean>(false)
const error = ref<string>('')

const handleLogin = async () => {
  if (!valid.value) return

  const success = await authLogin({
    email: email.value,
    password: password.value,
  })

  if (success) {
    // Redirecionar para dashboard
    router.push('/home')
  } else {
    // Mostrar erro do composable
    error.value = authError.value || 'Erro ao fazer login'
  }
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
