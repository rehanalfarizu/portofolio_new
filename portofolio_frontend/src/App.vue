<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-all">
    <!-- Tampilkan Navbar dan Footer jika bukan halaman Dashboard atau Login -->
    <Navbar v-if="!hideLayout" />

    <main>
      <RouterView />
    </main>

    <Footer v-if="!hideLayout" />
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// Deteksi route aktif
const route = useRoute()

// Daftar routes yang tidak memerlukan layout (navbar/footer)
const routesWithoutLayout = ['/dashboard', '/login']

// Computed property untuk menyembunyikan layout
const hideLayout = computed(() => {
  const currentPath = route.path.toLowerCase()
  return routesWithoutLayout.some(path => currentPath.startsWith(path))
})

// Debug: Monitor route changes
watch(() => route.path, (newPath) => {
  console.log('Current route:', newPath)
  console.log('Hide layout:', hideLayout.value)
}, { immediate: true })

// Dark mode initialization
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
