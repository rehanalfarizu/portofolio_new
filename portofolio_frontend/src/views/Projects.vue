<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Projects</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div v-for="project in projects" :key="project.id" class="p-4 border rounded-lg shadow dark:bg-gray-800">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ project.title }}</h3>
        <p class="text-gray-600 dark:text-gray-300">{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../api/api'

const projects = ref([])

onMounted(async () => {
  projects.value = await fetchData('projects')
})
</script>
