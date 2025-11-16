<template>
  <div>
    <h1>Chat do Anime</h1>

    <div v-for="(m, i) in chat.messages" :key="i">
      <p><b>{{ m.usuarioId }}</b>: {{ m.mensagem }}</p>
    </div>

    <input v-model="texto" placeholder="Escreva aqui..." />
    <button @click="enviar">Enviar</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/stores/WebSocketStore'

const chat = useChatStore()
const route = useRoute()

const texto = ref('')

onMounted(() => {
  chat.connect(route.params.animeId as string)
})

function enviar() {
  chat.sendMessage({
    mensagem: texto.value,
    usuarioId: "user123",
    animeId: route.params.animeId,
    dataCriacao: new Date().toISOString()
  })
  texto.value = ''
}
</script>
