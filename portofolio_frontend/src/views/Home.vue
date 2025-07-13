<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Video Background -->
    <video
      ref="videoRef"
      class="absolute inset-0 w-full h-full object-cover"
      style="z-index: 1;"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      @loadeddata="onVideoLoaded"
      @error="onVideoError"
    >
      <source :src="videoSrc" type="video/mp4">
      <!-- Fallback untuk browser yang tidak mendukung video -->
      Your browser does not support the video tag.
    </video>

    <!-- Fallback Background (jika video gagal load) -->
    <div
      v-if="videoError || !videoLoaded"
      class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"
      style="z-index: 1;"
    ></div>

    <!-- Dark Overlay -->
    <!----<div class="absolute inset-0 bg-black bg-opacity-50" style="z-index: 2;"></div>-->

    <!-- Content -->
    <div class="relative z-20 p-6 text-center max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
        Welcome to My Portfolio
      </h2>
      <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
        Explore my work, skills, and experience.
      </p>

      <!-- Call to Action Buttons -->
      <div class="space-x-4">
        <button
          @click="viewWork"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          View My Work
        </button>
        <button
          @click="contactMe"
          class="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Contact Me
        </button>
      </div>
    </div>

    <!-- Debug Info (hapus setelah berhasil) -->
    <!----<div class="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded z-30">
      <p>Video Source: {{ videoSrc }}</p>
      <p>Video Loaded: {{ videoLoaded }}</p>
      <p>Video Error: {{ videoError }}</p>
    </div>-->

  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const videoRef = ref(null)
const videoSrc = ref('/Zoro_1.mp4')
const videoLoaded = ref(false)
const videoError = ref(false)

const onVideoLoaded = () => {
  console.log('Video loaded successfully')
  videoLoaded.value = true
  videoError.value = false
}

const onVideoError = (error) => {
  console.error('Video error:', error)
  videoError.value = true
  videoLoaded.value = false
}

const playVideo = async () => {
  if (videoRef.value) {
    try {
      await videoRef.value.play()
      console.log('Video is playing')
    } catch (error) {
      console.error('Video play failed:', error)
      videoError.value = true
    }
  }
}

onMounted(async () => {
  await nextTick()

  // Cek apakah video element ada
  if (videoRef.value) {
    console.log('Video element found')

    // Tunggu sebentar sebelum mencoba play
    setTimeout(() => {
      playVideo()
    }, 100)
  } else {
    console.error('Video element not found')
  }
})

// Fungsi untuk button actions
const viewWork = () => {
  // Implementasi navigate ke work section
  console.log('View work clicked')
}

const contactMe = () => {
  // Implementasi navigate ke contact section
  console.log('Contact me clicked')
}
</script>

<style scoped>
/* Memastikan video selalu cover seluruh area */
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* Animasi fade in untuk konten */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Memastikan container tidak ada scroll */
.overflow-hidden {
  overflow: hidden;
}
</style>
