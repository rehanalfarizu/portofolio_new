<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Me</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Name</label>
        <input v-model="form.name" required class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" v-model="form.email" required class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Message</label>
        <textarea v-model="form.message" required class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
    </form>
    <p v-if="submitted" class="text-green-600 mt-4">Message sent successfully!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:3000/api/contact', form.value)
    submitted.value = true
    form.value = { name: '', email: '', message: '' }
  } catch (err) {
    console.error('Contact error:', err)
  }
}
</script>
