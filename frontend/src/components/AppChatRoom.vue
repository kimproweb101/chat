<template>
  <div>
    <div>
      <div>server</div>
      <div v-for="(message_server, index) in messages_server" :key="index">
        {{ message_server }}
      </div>
    </div>
  </div>
  <div>
    <input type="text" v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">전송</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const messages_server = ref([])
const message = ref('')

const socket = io('http://localhost:3000/chats')

socket.on('connect', () => {
  console.log('연결 성공:', socket.id)
})

socket.on('send_message', (msg) => {
  messages_server.value.push(msg)
})

const sendMessage = () => {
  socket.emit('send_message', message.value)
  message.value = ''
}
</script>

<style scoped>
.chat-room {
  width: 400px;
  margin: 20px auto;
  border: 1px solid #aaa;
  padding: 10px;
  border-radius: 8px;
}
.messages {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 5px;
}
.input-box {
  display: flex;
  gap: 5px;
}
input {
  flex: 1;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
</style>
