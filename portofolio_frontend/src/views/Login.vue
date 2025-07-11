<template>
  <div class="max-w-sm mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded shadow">
    <h2 class="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">Admin Login</h2>
    <form @submit.prevent="login" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Invalid credentials'
  }
}
</script>
