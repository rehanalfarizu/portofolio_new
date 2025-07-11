<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">My Skills</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
      <li v-for="skill in skills" :key="skill.id" class="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
        {{ skill.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../app/api'

const skills = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/skills')
    skills.value = response.data
  } catch (error) {
    console.error('Error fetching skills:', error)
  }
})
</script>
