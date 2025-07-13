<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Experience</h2>
    <ul class="space-y-4">
      <li v-for="exp in experiences" :key="exp.id" class="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
        <h3 class="text-lg font-bold">{{ exp.position }} - {{ exp.company }}</h3>
        <p class="text-sm text-gray-500">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</p>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ exp.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../services/api'

const experiences = ref([])

onMounted(async () => {
  experiences.value = await fetchData('experience')
})
</script>
