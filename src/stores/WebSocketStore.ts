import { defineStore } from 'pinia'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export const useChatStore = defineStore('chat', {
  state: () => ({
    stompClient: null as any,
    messages: [] as any[]
  }),

  actions: {
    connect(animeId: string) {
      const socket = new SockJS('http://localhost:8080/ws')
      this.stompClient = Stomp.over(socket)

      this.stompClient.connect({}, () => {
        console.log("Connected to WebSocket!")

        this.stompClient.subscribe(`/topic/chat/${animeId}`, (message: any) => {
          this.messages.push(JSON.parse(message.body))
        })
      })
    },

    sendMessage(msg: any) {
      if (!this.stompClient) return
      this.stompClient.send('/app/chat.send', {}, JSON.stringify(msg))
    }
  }
})
