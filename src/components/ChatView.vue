<template>
  <div class="chat-container">
    <h1>Anime Chat</h1>

    <div class="messages-list">
      <div v-for="(message, index) in chatStore.messages" :key="index" class="message-item">
        <p><b>{{ message.userId }}</b>: {{ message.message }}</p>
      </div>
    </div>

    <div class="message-input">
      <input v-model="messageText" placeholder="Type here...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  // import { useChatStore } from '@/stores/WebSocketStore' // TODO: Uncomment when backend is active

  // const chatStore = useChatStore() // TODO: Uncomment when backend is active
  const route = useRoute()

  const messageText = ref<string>('')

  // TODO: Uncomment when backend is active
  /*
onMounted(() => {
  const animeId = route.params.id as string
  chatStore.connect(animeId)
})

onUnmounted(() => {
  chatStore.disconnect()
})

function sendMessage(): void {
  if (!messageText.value.trim()) {
    return
  }

  chatStore.sendMessage({
    message: messageText.value,
    userId: 'user123', // TODO: Get from auth store
    animeId: route.params.id as string,
    createdAt: new Date().toISOString(),
  })

  messageText.value = ''
}
*/

  // Placeholder function for when backend is active
  function sendMessage (): void {
    console.log('WebSocket not active yet. Backend required to enable chat.')
  }
</script>

<style scoped>
.chat-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.messages-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.message-item {
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
}

.message-input {
  display: flex;
  gap: 10px;
}

.message-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-input button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-input button:hover {
  background-color: #1565c0;
}
</style>
