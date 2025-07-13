<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-all">
    <!-- Tampilkan Navbar dan Footer jika bukan halaman Dashboard -->
    <Navbar v-if="!isDashboard" />

    <main>
      <RouterView />
    </main>

    <Footer v-if="!isDashboard" />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// Deteksi route aktif
const route = useRoute()

// Jika route saat ini adalah dashboard, sembunyikan Navbar dan Footer
const isDashboard = computed(() => route.path.startsWith('/dashboard'))

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
