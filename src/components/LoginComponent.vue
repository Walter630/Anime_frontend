<template>
  <v-container
    class="login-wrapper d-flex align-center justify-center"
  >
    <v-card
      class="login-card pa-8 d-flex flex-column align-center"
      elevation="0"
    >
      <div class="text-center mb-6">
        <img alt="Logo" width="140" />
        <p class="text-subtitle-2 mt-1">Bem-vindo de volta</p>
      </div>

      <v-form @submit.prevent="onLogin" class="w-100 d-flex flex-column align-center">

        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="email"
            type="email"
            variant="outlined"
            density="comfortable"
            placeholder="Email"
            class="mb-4"
          />
        </div>

        <div class="w-100">
          <label class="field-label">Senha</label>
          <v-text-field
            v-model="senha"
            type="password"
            variant="outlined"
            density="comfortable"
            placeholder="Senha"
            class="mb-6"
          />
        </div>

        <v-btn
          type="submit"
          class="login-btn mb-4"
          height="42"
          block
          append-icon="mdi-arrow-right"
        >
          ENTRAR
        </v-btn>

        <p class="text-subtitle-2 mb-2">Não tem conta ainda?</p>

        <v-btn
          variant="tonal"
          height="42"
          block
          color="black"
          @click="$router.push('/register')"
        >
          CRIAR UMA CONTA
        </v-btn>

      </v-form>

      <p class="mt-8 text-caption">
        Termos de uso | Política de privacidade
      </p>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const senha = ref("");

const onLogin = () => {
  console.log("Login enviado:", email.value, senha.value);
};
</script>

<style scoped>
/* Fundo geral */
.login-wrapper {
  background: #F1DFC2;
  min-height: 100vh;
  width: 100%;
}

/* Card central */
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

/* Botão principal */
.login-btn {
  background-color: #F44336;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
