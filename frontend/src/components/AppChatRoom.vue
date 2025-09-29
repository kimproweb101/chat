<template>
  <div>
    <div>
      <div>방 선택 {{ rooms }}</div>
      <div>
      <label><input type="checkbox" value="1" v-model="rooms"/>방1 </label>
      <label><input type="checkbox" value="2" v-model="rooms"/>방2 </label>
      <label><input type="checkbox" value="3" v-model="rooms"/>방3 </label>
      </div>
      <button @click="enter_chat">전송</button>
    </div>    
  </div> 
  <div>
    <hr />
    <div>메시지 전송</div>
    <div>방 선택 {{ selectedRoom }}</div>
      <div>
      <select v-model="selectedRoom">
        <option value="1">1번방</option>
        <option value="2">2번방</option>
        <option value="3">3번방</option>
      </select>
      </div>
      <div>
        <form @submit.prevent="send_message()">
          <input type="text" v-model="message">
          <button>전송</button>
        </form>
      </div>
  </div>
  <div>
    <hr />
      <div>server</div>
      <div v-for="(message_server, index) in messages_server" :key="index">
        
        {{ message_server.socket }} : {{ message_server.message }}
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000/chats')
socket.on('connect', () => {
  console.log('연결 성공:', socket.id)
})

const rooms=ref([])
const enter_chat=()=>{
  if(rooms.value.length === 0) return
  socket.emit('enter_chat', rooms.value)  
}

const message=ref('')
const selectedRoom=ref()
const messages_server=ref([])
const send_message=()=>{
  const data={
    "message": message.value,
    "chatId": parseInt(selectedRoom.value)
  }
  socket.emit('send_message', data)
  message.value=null  
}

socket.on('send_message', (msg) => {  
  console.log('send_message')
  console.log(msg)
  // messages_server.value.push(msg)
})

socket.on('receive_message', (msg) => {
  console.log('receive_message')
  console.log(msg)
  messages_server.value.push(msg)
})
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
