<template>
  <v-container
    class="register-wrapper d-flex align-center justify-center"
  >
    <v-card
      class="register-card pa-8 d-flex flex-column align-center"
      elevation="4"
    >
      <div class="text-center mb-6">
        <img  alt="Logo" width="140" />
        <p class="text-subtitle-2 mt-1">Preencha seus dados</p>
      </div>

      <v-form @submit.prevent="onRegister" class="w-100 d-flex flex-column align-center">

        <!-- Nome -->
        <div class="w-100">
          <label class="field-label">Nome</label>
          <v-text-field
            v-model="nome"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            placeholder="Nome"
          />
        </div>

        <!-- Email -->
        <div class="w-100">
          <label class="field-label">Email</label>
          <v-text-field
            v-model="email"
            type="email"
            variant="outlined"
            placeholder="Email"
            density="comfortable"
            class="mb-2"
          />
        </div>

        <!-- Senha -->
        <div class="w-100">
          <label class="field-label">Senha</label>
          <v-text-field
            v-model="senha"
            type="password"
            variant="outlined"
            density="comfortable"
            placeholder="Senha"
            class="mb-4"
          />
        </div>

        <!-- Botão cadastrar -->
        <v-btn
          type="submit"
          class="register-btn mb-4"
          height="42"
          block
        >
          CADASTRAR
        </v-btn>
        <div style="align-items: start">
          <p style="text-align: start">Ja tem Conta?</p>
        </div>
        <!-- Voltar para o login -->
        <v-btn
          variant="tonal"
          height="42"
          block
          @click="$router.push('/login')"
        >
          ENTRAR
        </v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const nome = ref("");
const email = ref("");
const senha = ref("");

const onRegister = () => {
  console.log("Cadastro enviado:", nome.value, email.value, senha.value);
};
</script>

<style scoped>
/* Fundo geral */
.register-wrapper {
  background: #F1DFC2;
  min-height: 100vh;
  width: 100%;
}

/* Card central */
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

/* Botão principal */
.register-btn {
  background-color: #F44336;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
