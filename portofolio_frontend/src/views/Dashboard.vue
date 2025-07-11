<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Admin Dashboard</h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">Total Visitors: {{ stats.visitors }}</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow" v-for="item in items" :key="item.title">
        <h3 class="font-bold text-lg text-gray-800 dark:text-white">{{ item.title }}</h3>
        <p class="text-gray-600 dark:text-gray-300">{{ item.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../utils/api'

const stats = ref({ visitors: 0 })
const items = ref([])

onMounted(async () => {
  const dashboard = await fetchData('dashboard')
  stats.value.visitors = dashboard.visitors || 0
  items.value = [
    { title: 'Skills', count: dashboard.skills },
    { title: 'Projects', count: dashboard.projects },
    { title: 'Testimonials', count: dashboard.testimonials },
    { title: 'Experience', count: dashboard.experience },
  ]
})
</script>
