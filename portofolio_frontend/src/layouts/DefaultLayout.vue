<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- 404 Illustration -->
      <div class="relative">
        <div class="text-9xl font-bold text-indigo-200 select-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg animate-bounce">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.886-6.14-2.344C7.096 10.815 9.349 9 12 9c2.651 0 4.904 1.815 6.14 3.656A7.962 7.962 0 0112 15z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">
          Oops! Halaman Tidak Ditemukan
        </h1>
        <p class="text-lg text-gray-600">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goBack"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali
        </button>

        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Ke Beranda
        </router-link>
      </div>

      <!-- Help Text -->
      <div class="pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Jika Anda yakin ini adalah kesalahan, silakan
          <a href="#" @click="reportError" class="text-indigo-600 hover:text-indigo-500 underline">
            laporkan masalah ini
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      // Kembali ke halaman sebelumnya
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    reportError() {
      // Implementasi untuk melaporkan error
      // Bisa redirect ke halaman kontak atau buka email
      console.log('Melaporkan error 404 untuk URL:', this.$route.fullPath)

      // Contoh redirect ke halaman kontak
      // this.$router.push('/contact')

      // Atau buka email
      // window.location.href = 'mailto:admin@example.com?subject=404 Error Report&body=URL: ' + window.location.href
    }
  },
  mounted() {
    // Track 404 error untuk analytics (opsional)
    console.log('404 Error - Page not found:', this.$route.fullPath)
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-9xl {
    font-size: 6rem;
  }
}
</style>
