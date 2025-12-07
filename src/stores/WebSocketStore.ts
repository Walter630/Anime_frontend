import { defineStore } from 'pinia'
// import SockJS from 'sockjs-client' // TODO: Uncomment when backend is active
// import Stomp from 'stompjs' // TODO: Uncomment when backend is active

interface ChatMessage {
  message: string
  userId: string
  animeId: string
  createdAt: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    stompClient: null as any,
    messages: [] as ChatMessage[],
  }),

  actions: {
    connect(animeId: string) {
      try {
        // TODO: Uncomment when backend is active
        /*
        const socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, () => {
          console.log('Connected to WebSocket!')

          this.stompClient.subscribe(`/topic/chat/${animeId}`, (message: any) => {
            try {
              const parsedMessage = JSON.parse(message.body)
              this.messages.push(parsedMessage)
            } catch (error) {
              console.error('Error parsing WebSocket message:', error)
            }
          })
        })
        */
        console.warn('WebSocket not active. Backend required.')
      } catch (error) {
        console.error('WebSocket connection error:', error)
      }
    },

    sendMessage(msg: ChatMessage) {
      // TODO: Uncomment when backend is active
      /*
      if (!this.stompClient) {
        console.warn('WebSocket not connected')
        return
      }
      try {
        this.stompClient.send('/app/chat.send', {}, JSON.stringify(msg))
      } catch (error) {
        console.error('Error sending message:', error)
      }
      */
      console.warn('WebSocket not active. Backend required.')
    },

    disconnect() {
      // TODO: Uncomment when backend is active
      /*
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.disconnect(() => {
          console.log('Disconnected from WebSocket')
        })
      }
      */
    },
  },
})
