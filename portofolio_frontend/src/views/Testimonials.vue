<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Testimonials</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="testi in testimonials"
        :key="testi.id"
        class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
      >
        <p class="text-gray-700 dark:text-gray-300 italic">“{{ testi.message }}”</p>
        <div class="mt-2 text-sm text-right text-gray-500 dark:text-gray-400">
          — {{ testi.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '../services/api'

const testimonials = ref([])

onMounted(async () => {
  testimonials.value = await fetchData('testimonials')
})
</script>
