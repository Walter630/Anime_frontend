<template>
  <v-container class="py-10" style="max-width: 600px;">

    <div class="text-center mb-6">
      <v-avatar size="90" class="mb-3">
        <img :src="foto" />
      </v-avatar>
      <h2 class="font-weight-bold">Editar Perfil</h2>
    </div>

    <v-form class="mt-4">

      <v-text-field v-model="nome" label="Nome completo" variant="outlined" class="mb-4" />

      <v-text-field v-model="email" label="Novo e-mail" variant="outlined" class="mb-4" />

      <v-text-field v-model="senha" type="password" label="Nova senha" variant="outlined" class="mb-4" />

      <v-btn block color="red" height="48" class="mb-4">Salvar alterações</v-btn>
      <v-btn block variant="tonal" height="48" @click="$router.push('/perfil')">
        Cancelar
      </v-btn>
    </v-form>

  </v-container>
</template>

<script setup>
import { ref } from "vue";

const nome = ref("");
const email = ref("");
const senha = ref("");
</script>
