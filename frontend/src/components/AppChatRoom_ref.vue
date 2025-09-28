<template>
  <div class="chat-room">
    <h2>💬 Chat Room (namespace: /chats)</h2>

    <div class="messages">
      <div v-for="(msg, idx) in messages" :key="idx">
        {{ msg }}
      </div>
    </div>

    <div class="input-box">
      <input v-model="message" @keyup.enter="sendMessage" placeholder="메시지 입력" />
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

// ✅ 백엔드 네임스페이스 /chats 로 연결
const socket = io('http://localhost:3000/chats')

const message = ref('')
const messages = ref([])

onMounted(() => {
  // 연결 확인
  socket.on('connect', () => {
    console.log('✅ 연결 성공:', socket.id)
  })

  // 서버에서 broadcast 해주는 메시지가 없어서
  // 일단 내가 보낸 메시지를 화면에 출력
  socket.on('send_message', (msg) => {
    messages.value.push(`서버 응답: ${msg}`)
  })
})

onUnmounted(() => {
  socket.disconnect()
})

const sendMessage = () => {
  if (!message.value) return

  // 서버로 이벤트 전송
  socket.emit('send_message', message.value)

  // 로컬 메시지 추가
  messages.value.push(`나: ${message.value}`)

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
