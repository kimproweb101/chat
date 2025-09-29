<template>
  <div>
    <div>
      <div>방 선택 {{ rooms }}</div>
      <div>
      <label><input type="checkbox" value="1" v-model="rooms"/>방1 </label>
      <label><input type="checkbox" value="2" v-model="rooms"/>방2 </label>
      <label><input type="checkbox" value="3" v-model="rooms"/>방3 </label>
      </div>
      <button @click="">입장</button>
    </div>
    <div>
      <div>server</div>
      <div v-for="(message_server, index) in messages_server" :key="index">
        {{ message_server }}
      </div>
    </div>
  </div>
  <div>
    <hr />
  </div>
  <div>
    <div>선택한 방에 메시지 전송</div>
    <div>
      <input type="checkbox" v-model="room1"/>방1 
      <input type="checkbox" v-model="room2"/>방2 
      <input type="checkbox" v-model="room3"/>방3 
    </div>
    <input type="text" v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">전송</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const rooms=ref([])

const selectedRoomNumber=ref()
const messages_server = ref([])



const socket = io('http://localhost:3000/chats')

socket.on('connect', () => {
  console.log('연결 성공:', socket.id)
})

socket.on('send_message', (msg) => {
  console.log(msg)
  // messages_server.value.push(msg)
})

const message=ref('')
const chatId=ref('')

const sendMessage = () => {
  const message={
    "message": message.value,
    "chatId": chatId.value
  }
  socket.emit('send_message', message)
  message.value = ''
}

const enter_chat = () => {
  const selectedRooms=[1,2]
  socket.emit('enter_chat', selectedRooms) 
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
