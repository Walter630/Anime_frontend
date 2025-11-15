<template>
  <v-container class="py-10" style="max-width: 600px;">

    <h2 class="text-h5 font-weight-bold mb-6 text-center">Nova Foto</h2>

    <div class="d-flex justify-center mb-6">
      <v-avatar size="120">
        <img :src="foto" />
      </v-avatar>
    </div>

    <v-file-input
      v-model="foto"
      label="Selecione uma imagem"
      accept="image/*"
      variant="outlined"
      class="mb-4"
    />

    <v-btn block color="red" height="48" class="mb-4">Salvar Foto</v-btn>
    <v-btn block variant="tonal" height="48" @click="$router.push('/perfil')">
      Cancelar
    </v-btn>

  </v-container>
</template>

<script setup>
import { ref } from "vue";

const foto = ref(null);
</script>
