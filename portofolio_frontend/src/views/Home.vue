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
      Your browser does not support the video tag.
    </video>

    <!-- Audio Background -->
    <audio
      ref="audioRef"
      loop
      preload="auto"
      @loadeddata="onAudioLoaded"
      @error="onAudioError"
      @canplaythrough="onAudioCanPlay"
      @loadstart="onAudioLoadStart"
      @loadedmetadata="onAudioLoadedMetadata"
    >
      <source :src="audioSrc" type="audio/mpeg">
      <source :src="audioSrc.replace('.mp3', '.wav')" type="audio/wav">
      <source :src="audioSrc.replace('.mp3', '.ogg')" type="audio/ogg">
    </audio>

    <!-- Audio Control Button -->
    <button
      @click="toggleAudio"
      class="absolute top-4 right-4 z-30 bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-opacity"
      :class="{ 'animate-pulse': !audioLoaded }"
    >
      <span v-if="!audioLoaded">⏳</span>
      <span v-else>{{ audioPlaying ? '🔊' : '🔇' }}</span>
    </button>

    <!-- Fallback Background -->
    <div
      v-if="videoError || !videoLoaded"
      class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"
      style="z-index: 1;"
    ></div>

    <!-- Multiple overlay layers -->
    <div class="absolute inset-0 bg-black/30" style="z-index: 2; pointer-events: none;"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" style="z-index: 3; pointer-events: none;"></div>

    <!-- Content -->
    <div class="relative z-20 p-6 text-center max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
        {{ staticText }}{{ displayedText }}<span class="typewriter-cursor" v-if="showCursor">|</span>
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

    <!-- Enhanced Debug Info -->
   <!-- <div class="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 p-3 rounded z-30 max-w-xs">
      <div class="mb-2">
        <strong>Audio Status:</strong>
      </div>
      <div class="space-y-1 text-xs">
        <p>Source: {{ audioSrc }}</p>
        <p>Loaded: <span :class="audioLoaded ? 'text-green-400' : 'text-red-400'">{{ audioLoaded ? 'Yes' : 'No' }}</span></p>
        <p>Error: <span :class="audioError ? 'text-red-400' : 'text-green-400'">{{ audioError ? 'Yes' : 'No' }}</span></p>
        <p>Playing: <span :class="audioPlaying ? 'text-green-400' : 'text-yellow-400'">{{ audioPlaying ? 'Yes' : 'No' }}</span></p>
        <p>Can Play: <span :class="audioCanPlay ? 'text-green-400' : 'text-yellow-400'">{{ audioCanPlay ? 'Yes' : 'No' }}</span></p>
        <p>Element: {{ audioRef ? 'Found' : 'Not Found' }}</p>
      </div>
      <div class="mt-2 space-x-2">
        <button @click="testAudio" class="bg-blue-500 text-white px-2 py-1 rounded text-xs">Test</button>
        <button @click="checkAudioFile" class="bg-green-500 text-white px-2 py-1 rounded text-xs">Check File</button>
        <button @click="forceLoadAudio" class="bg-purple-500 text-white px-2 py-1 rounded text-xs">Force Load</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const videoRef = ref(null)
const videoSrc = ref('/Zoro_1.mp4')
const videoLoaded = ref(false)
const videoError = ref(false)

// Audio variables - FIXED PATH
const audioRef = ref(null)
const audioSrc = ref('/background-sound.wav') // Correct path for public folder
const audioLoaded = ref(false)
const audioError = ref(false)
const audioPlaying = ref(false)
const audioCanPlay = ref(false)

// Typewriter animation variables
const staticText = "Welcome to My "
const dynamicWords = ["Portfolio", "Design", "Web Development", "Projects", "Skills", "Experience"]
const currentWordIndex = ref(0)
const displayedText = ref("")
const showCursor = ref(true)
const typingSpeed = 100
const deletingSpeed = 50
const pauseTime = 2000

// Video functions
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

// Enhanced Audio functions
const onAudioLoadStart = () => {
  console.log('🔄 Audio load started')
}

const onAudioLoadedMetadata = () => {
  console.log('📊 Audio metadata loaded')
}

const onAudioLoaded = () => {
  console.log('✅ Audio loaded successfully')
  audioLoaded.value = true
  audioError.value = false
}

const onAudioError = (error) => {
  console.error('❌ Audio error:', error)
  console.error('Audio src:', audioSrc.value)
  console.error('Audio element:', audioRef.value)
  audioError.value = true
  audioLoaded.value = false
}

const onAudioCanPlay = () => {
  console.log('✅ Audio can play')
  audioCanPlay.value = true
}

const forceLoadAudio = () => {
  console.log('🔧 Force loading audio...')
  if (audioRef.value) {
    audioRef.value.src = audioSrc.value
    audioRef.value.load()
    console.log('Audio force load initiated')
  }
}

const checkAudioFile = async () => {
  try {
    const response = await fetch(audioSrc.value)
    console.log('Audio file check - Status:', response.status)
    console.log('Audio file check - OK:', response.ok)
    console.log('Audio file check - Content-Type:', response.headers.get('content-type'))

    if (response.ok) {
      console.log('✅ Audio file exists and is accessible')
    } else {
      console.error('❌ Audio file not found or not accessible')
    }
  } catch (error) {
    console.error('❌ Error checking audio file:', error)
  }
}

const testAudio = async () => {
  console.log('🔧 Testing audio...')
  console.log('Audio ref:', audioRef.value)
  console.log('Audio src:', audioSrc.value)
  console.log('Audio loaded:', audioLoaded.value)
  console.log('Audio can play:', audioCanPlay.value)

  if (audioRef.value) {
    try {
      // Reset audio to beginning
      audioRef.value.currentTime = 0
      audioRef.value.volume = 0.3 // Lower volume for testing

      console.log('Attempting to play audio...')
      await audioRef.value.play()
      audioPlaying.value = true
      console.log('✅ Test audio started successfully')
    } catch (error) {
      console.error('❌ Test audio failed:', error)

      // Try to understand the error
      if (error.name === 'NotAllowedError') {
        console.log('💡 User interaction required for audio playback')
      } else if (error.name === 'NotSupportedError') {
        console.log('💡 Audio format not supported')
      }
    }
  } else {
    console.error('❌ Audio element not found')
  }
}

const toggleAudio = async () => {
  console.log('🔊 Toggle audio clicked')

  if (!audioRef.value) {
    console.error('❌ Audio element not found')
    return
  }

  if (!audioLoaded.value) {
    console.log('⏳ Audio not loaded yet')
    return
  }

  try {
    if (audioPlaying.value) {
      audioRef.value.pause()
      audioPlaying.value = false
      console.log('⏸️ Audio paused')
    } else {
      audioRef.value.volume = 0.3
      audioRef.value.currentTime = 0 // Start from beginning
      await audioRef.value.play()
      audioPlaying.value = true
      console.log('▶️ Audio started playing')
    }
  } catch (error) {
    console.error('❌ Audio toggle failed:', error)

    if (error.name === 'NotAllowedError') {
      console.log('💡 Browser blocked autoplay - user interaction required')
    }
  }
}

// Improved auto-play initialization
const initAudioAutoPlay = () => {
  const tryAutoPlay = async () => {
    if (audioRef.value && audioLoaded.value && !audioPlaying.value) {
      try {
        audioRef.value.volume = 0.2 // Start with lower volume
        await audioRef.value.play()
        audioPlaying.value = true
        console.log('🎵 Auto-play audio started')
      } catch (error) {
        console.log('ℹ️ Auto-play blocked by browser (normal behavior)')
      }
    }
  }

  // Wait for user interaction
  const events = ['click', 'touchstart', 'keydown']
  const startOnInteraction = () => {
    tryAutoPlay()
    events.forEach(event => {
      document.removeEventListener(event, startOnInteraction)
    })
  }

  events.forEach(event => {
    document.addEventListener(event, startOnInteraction, { once: true })
  })
}

// Typewriter animation function
const typeWriter = () => {
  let i = 0
  let isDeleting = false

  const animate = () => {
    const currentWord = dynamicWords[currentWordIndex.value]

    if (!isDeleting) {
      if (i < currentWord.length) {
        displayedText.value = currentWord.substring(0, i + 1)
        i++
        setTimeout(animate, typingSpeed)
      } else {
        setTimeout(() => {
          isDeleting = true
          animate()
        }, pauseTime)
      }
    } else {
      if (i > 0) {
        displayedText.value = currentWord.substring(0, i - 1)
        i--
        setTimeout(animate, deletingSpeed)
      } else {
        isDeleting = false
        currentWordIndex.value = (currentWordIndex.value + 1) % dynamicWords.length
        setTimeout(animate, typingSpeed)
      }
    }
  }

  animate()
}

onMounted(async () => {
  await nextTick()

  console.log('🚀 Component mounted')

  // Initialize video
  if (videoRef.value) {
    console.log('📹 Video element found')
    setTimeout(playVideo, 100)
  }

  // Initialize audio with better error handling
  if (audioRef.value) {
    console.log('🎵 Audio element found')
    console.log('Audio source:', audioSrc.value)

    // Set initial volume
    audioRef.value.volume = 0.3

    // Force set src and load
    audioRef.value.src = audioSrc.value
    audioRef.value.load()

    // Check if audio file exists
    await checkAudioFile()

    // Initialize auto-play attempt
    initAudioAutoPlay()
  } else {
    console.error('❌ Audio element not found')
  }

  // Start typewriter animation
  setTimeout(typeWriter, 500)
})

// Button functions
const viewWork = () => {
  console.log('View work clicked')
  // Also try to start audio on button click
  if (!audioPlaying.value) {
    toggleAudio()
  }
}

const contactMe = () => {
  console.log('Contact me clicked')
  // Also try to start audio on button click
  if (!audioPlaying.value) {
    toggleAudio()
  }
}
</script>

<style scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

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

.typewriter-cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.overflow-hidden {
  overflow: hidden;
}
</style>
