<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const { $axios } = useNuxtApp()

const userMessage = ref('')
const messages = ref([])

const sendMessage = async () => {
  if (userMessage.value.trim() === '') return

  const newMessage = {
    role: 'user',
    content: userMessage.value
  }

  messages.value.push(newMessage)
  userMessage.value = ''

  try {
    const response = await $axios.post('/chat', {
      messages: messages.value
    })

    console.log('API Response:', response.data)
    
    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      messages.value.push({
        role: 'assistant',
        content: response.data.choices[0].message.content
      })
    } else {
      console.error('Unexpected API response structure:', response.data)
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" class="chat-message">
        <strong>{{ message.role }}:</strong> {{ message.content }}
      </div>
    </div>
    <input
      type="text"
      v-model="userMessage"
      @keydown.enter="sendMessage"
      placeholder="Say something..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.chat-message {
  margin-bottom: 10px;
}

input {
  width: calc(100% - 100px);
  margin-right: 10px;
}

button {
  width: 80px;
}
</style>