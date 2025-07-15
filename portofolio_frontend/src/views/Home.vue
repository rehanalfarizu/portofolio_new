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

    <!-- Audio Background - Fixed for autoplay -->
    <audio
      ref="audioRef"
      loop
      preload="auto"
      crossorigin="anonymous"
      :muted="!userInteracted"
      @loadeddata="onAudioLoaded"
      @error="onAudioError"
      @canplaythrough="onAudioCanPlay"
      @loadstart="onAudioLoadStart"
      @loadedmetadata="onAudioLoadedMetadata"
      @play="onAudioPlay"
      @pause="onAudioPause"
      @ended="onAudioEnded"
    >
      <source src="/background-sound.mp3" type="audio/mpeg">
      <source src="/background-sound.wav" type="audio/wav">

      Your browser does not support the audio element.
    </audio>

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

      <!-- Call to Action Buttons - CONSISTENT SIZING -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="aboutme"
          class="w-full sm:w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
        >
          About Me
        </button>
        <button
          @click="contactMe"
          class="w-full sm:w-40 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 text-center"
        >
          Contact Me
        </button>
      </div>
    </div>

    <!-- Audio Controls - MOVED TO BOTTOM -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
      <!-- Audio Status Indicator -->
      <div class="bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm">
        <span v-if="audioLoaded && audioPlaying && !audioRef?.muted" class="text-green-400">🎵 Audio Playing</span>
        <span v-else-if="audioLoaded && audioPlaying && audioRef?.muted" class="text-yellow-400">🎵 Audio Muted</span>
        <span v-else-if="audioLoaded && !audioPlaying" class="text-yellow-400">🎵 Audio Ready</span>
        <span v-else-if="audioError" class="text-red-400">❌ Audio Error</span>
        <span v-else class="text-gray-400">⏳ Loading Audio...</span>
      </div>

      <!-- Audio Control Button -->
      <button
        @click="toggleAudio"
        class="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full transition-all duration-300"
        :class="{ 'animate-pulse': !audioLoaded, 'bg-green-500': audioPlaying && audioLoaded && !audioRef?.muted }"
      >
        <span v-if="!audioLoaded" class="text-white">⏳</span>
        <span v-else-if="audioPlaying && !audioRef?.muted" class="text-white">🔊</span>
        <span v-else-if="audioPlaying && audioRef?.muted" class="text-white">🔇</span>
        <span v-else class="text-white">🔇</span>
      </button>
    </div>

    <!-- Debug Panel (uncomment for debugging) -->
    <!-- <div class="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-70 p-4 rounded-lg z-30 max-w-sm">
      <div class="mb-2">
        <strong>🎵 Audio Debug Info:</strong>
      </div>
      <div class="space-y-1 text-xs">
        <p>Source: {{ currentAudioSrc }}</p>
        <p>Loaded: <span :class="audioLoaded ? 'text-green-400' : 'text-red-400'">{{ audioLoaded ? 'Yes' : 'No' }}</span></p>
        <p>Can Play: <span :class="audioCanPlay ? 'text-green-400' : 'text-yellow-400'">{{ audioCanPlay ? 'Yes' : 'No' }}</span></p>
        <p>Playing: <span :class="audioPlaying ? 'text-green-400' : 'text-red-400'">{{ audioPlaying ? 'Yes' : 'No' }}</span></p>
        <p>Muted: <span :class="audioRef?.muted ? 'text-yellow-400' : 'text-green-400'">{{ audioRef?.muted ? 'Yes' : 'No' }}</span></p>
        <p>Error: <span :class="audioError ? 'text-red-400' : 'text-green-400'">{{ audioError || 'None' }}</span></p>
        <p>Autoplay Attempts: {{ autoplayAttempts }}</p>
        <p>User Interacted: {{ userInteracted ? 'Yes' : 'No' }}</p>
      </div>
      <div class="mt-2 space-x-2">
        <button @click="forcePlayAudio" class="bg-green-500 text-white px-2 py-1 rounded text-xs">Force Play</button>
        <button @click="checkAudioFile" class="bg-blue-500 text-white px-2 py-1 rounded text-xs">Check File</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useVisitorTracking } from '../composables/useVisitorTracking.js'

// Visitor tracking
const { trackPageVisit } = useVisitorTracking()

// Video variables
const videoRef = ref(null)
const videoSrc = ref('/Zoro_1.mp4')
const videoLoaded = ref(false)
const videoError = ref(false)

// Audio variables with multiple format support
const audioRef = ref(null)
const audioFormats = [
  { src: '/background-sound.mp3', type: 'audio/mpeg' },

]
const currentAudioSrc = ref('/background-sound.mp3') // Default to MP3
const audioLoaded = ref(false)
const audioError = ref(false)
const audioPlaying = ref(false)
const audioCanPlay = ref(false)
const userInteracted = ref(false)
const autoplayAttempts = ref(0)

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
  console.log('✅ Video loaded successfully')
  videoLoaded.value = true
  videoError.value = false
}

const onVideoError = (error) => {
  console.error('❌ Video error:', error)
  videoError.value = true
  videoLoaded.value = false
}

const playVideo = async () => {
  if (videoRef.value) {
    try {
      await videoRef.value.play()
      console.log('▶️ Video is playing')
    } catch (error) {
      console.error('❌ Video play failed:', error)
      videoError.value = true
    }
  }
}

// Enhanced Audio Event Handlers
const onAudioLoadStart = () => {
  console.log('🔄 Audio load started')
}

const onAudioLoadedMetadata = () => {
  console.log('📊 Audio metadata loaded')
}

const onAudioLoaded = async () => {
  console.log('✅ Audio loaded successfully')
  audioLoaded.value = true
  audioError.value = false
}

const onAudioError = (error) => {
  console.error('❌ Audio error:', error.target?.error)
  audioError.value = error.target?.error?.message || 'Unknown audio error'
  audioLoaded.value = false
}

const onAudioCanPlay = async () => {
  console.log('✅ Audio can play')
  audioCanPlay.value = true

  // Attempt autoplay when audio is ready
  if (!audioPlaying.value) {
    await attemptAutoplay()
  }
}

const onAudioPlay = () => {
  console.log('▶️ Audio started playing')
  audioPlaying.value = true
}

const onAudioPause = () => {
  console.log('⏸️ Audio paused')
  audioPlaying.value = false
}

const onAudioEnded = () => {
  console.log('🔄 Audio ended, will loop')
  audioPlaying.value = false
}

// FIXED: Main autoplay function with muted start
const attemptAutoplay = async () => {
  if (!audioRef.value || !audioLoaded.value || audioPlaying.value) {
    return false
  }

  autoplayAttempts.value++
  console.log(`🎵 Attempting autoplay (attempt ${autoplayAttempts.value})`)

  try {
    // PENTING: Mulai dengan muted untuk autoplay
    audioRef.value.muted = true
    audioRef.value.volume = 0.2
    audioRef.value.currentTime = 0

    const playPromise = audioRef.value.play()

    if (playPromise !== undefined) {
      await playPromise
      console.log('✅ Autoplay successful (muted)!')

      // Jika berhasil, setup listener untuk unmute setelah user interaction
      if (!userInteracted.value) {
        setupUserInteractionAutoplay()
      }

      return true
    }
  } catch (error) {
    console.log('⚠️ Autoplay failed:', error.name, error.message)
    setupUserInteractionAutoplay()
    return false
  }
}

// FIXED: Enhanced user interaction autoplay with unmute
const setupUserInteractionAutoplay = () => {
  if (userInteracted.value) return

  console.log('🎯 Setting up user interaction autoplay...')

  const events = ['click', 'touchstart', 'keydown', 'scroll']

  const handleUserInteraction = async (event) => {
    console.log('👆 User interaction detected:', event.type)
    userInteracted.value = true

    // Remove all event listeners
    events.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })

    // Unmute and start audio
    if (audioRef.value && audioLoaded.value) {
      try {
        audioRef.value.muted = false
        audioRef.value.volume = 0.2

        if (!audioPlaying.value) {
          await audioRef.value.play()
        }

        console.log('✅ Audio started and unmuted after user interaction')
      } catch (error) {
        console.error('❌ Audio failed after user interaction:', error)
        // Try again with a slight delay
        setTimeout(async () => {
          try {
            await audioRef.value.play()
            console.log('✅ Audio started on retry after user interaction')
          } catch (retryError) {
            console.error('❌ Audio retry failed:', retryError)
          }
        }, 100)
      }
    }
  }

  // Add event listeners
  events.forEach(eventType => {
    document.addEventListener(eventType, handleUserInteraction, {
      once: true,
      passive: true,
      capture: true
    })
  })

  console.log('⏳ Waiting for user interaction to unmute audio...')
}

// FIXED: Manual toggle function
const toggleAudio = async () => {
  if (!audioRef.value) {
    console.error('❌ Audio element not found')
    return
  }

  if (!audioLoaded.value) {
    console.log('⏳ Audio not loaded yet')
    return
  }

  try {
    userInteracted.value = true

    if (audioPlaying.value) {
      audioRef.value.pause()
      console.log('⏸️ Audio paused manually')
    } else {
      audioRef.value.muted = false
      audioRef.value.volume = 0.3
      await audioRef.value.play()
      console.log('▶️ Audio started manually')
    }
  } catch (error) {
    console.error('❌ Manual audio toggle failed:', error)
  }
}

// Force play function for debugging
const forcePlayAudio = async () => {
  if (!audioRef.value) return

  try {
    audioRef.value.muted = false
    audioRef.value.volume = 0.3
    audioRef.value.currentTime = 0
    await audioRef.value.play()
    userInteracted.value = true
    console.log('🔧 Force play successful')
  } catch (error) {
    console.error('🔧 Force play failed:', error)
  }
}

// Check multiple audio formats
const checkAudioFile = async () => {
  for (const format of audioFormats) {
    try {
      const response = await fetch(format.src)
      console.log(`📁 Audio file check [${format.type}]:`, {
        src: format.src,
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type'),
        size: response.headers.get('content-length')
      })

      if (response.ok) {
        console.log(`✅ Found working audio format: ${format.type}`)
        currentAudioSrc.value = format.src
        return format
      }
    } catch (error) {
      console.error(`📁 Audio file check failed for ${format.src}:`, error)
    }
  }

  console.error('❌ No working audio formats found')
  audioError.value = 'No supported audio formats found'
  return null
}

// Development helper function
const initializeAudioForDevelopment = async () => {
  // Untuk development, coba force play setelah delay
  if (import.meta.env.DEV) {
    setTimeout(async () => {
      if (audioRef.value && audioLoaded.value && !audioPlaying.value) {
        try {
          audioRef.value.muted = false
          audioRef.value.volume = 0.1
          await audioRef.value.play()
          userInteracted.value = true
          console.log('🔧 Development autoplay successful')
        } catch (error) {
          console.log('🔧 Development autoplay failed, waiting for user interaction')
        }
      }
    }, 2000)
  }
}

// Typewriter animation
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

// Page visibility change handler
const handleVisibilityChange = () => {
  if (document.hidden) {
    if (audioRef.value && audioPlaying.value) {
      audioRef.value.pause()
    }
  } else {
    if (audioRef.value && audioLoaded.value && !audioPlaying.value && userInteracted.value) {
      audioRef.value.play().catch(console.error)
    }
  }
}

// FIXED: Enhanced button functions that guarantee audio start
const aboutme = async () => {
  console.log('📄 About Me clicked')
  userInteracted.value = true

  // Force start audio regardless of current state
  if (audioRef.value && audioLoaded.value) {
    try {
      audioRef.value.muted = false
      audioRef.value.volume = 0.3
      audioRef.value.currentTime = 0
      const playPromise = audioRef.value.play()
      if (playPromise !== undefined) {
        await playPromise
        console.log('✅ Audio started via About Me button')
      }
    } catch (error) {
      console.error('❌ Audio failed on About Me :', error)
    }
  }

  // Add your navigation logic here
  // window.location.href = '/work' // Example
}

const contactMe = async () => {
  console.log('📧 Contact me clicked')
  userInteracted.value = true

  // Force start audio regardless of current state
  if (audioRef.value && audioLoaded.value) {
    try {
      audioRef.value.muted = false
      audioRef.value.volume = 0.3
      audioRef.value.currentTime = 0
      const playPromise = audioRef.value.play()
      if (playPromise !== undefined) {
        await playPromise
        console.log('✅ Audio started via Contact Me button')
      }
    } catch (error) {
      console.error('❌ Audio failed on Contact Me:', error)
    }
  }

  // Add your contact logic here
  // window.open('mailto:your-email@example.com') // Example
}

// FIXED: Main mounting function
onMounted(async () => {
  await nextTick()
  console.log('🚀 Component mounted')

  // Initialize video
  if (videoRef.value) {
    console.log('📹 Video element found')
    setTimeout(playVideo, 100)
  }

  // FIXED: Initialize audio with comprehensive fallback
  if (audioRef.value) {
    console.log('🎵 Audio element found')

    // Set audio properties
    audioRef.value.volume = 0.2
    audioRef.value.preload = 'auto'
    audioRef.value.muted = true // Mulai dengan muted

    // Check audio files and find the best format
    const workingFormat = await checkAudioFile()
    if (workingFormat) {
      audioRef.value.src = workingFormat.src
    }

    // Load audio
    audioRef.value.load()

    // Initialize development helper
    await initializeAudioForDevelopment()

  } else {
    console.error('❌ Audio element not found')
  }

  // Add visibility change listener
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Start typewriter animation
  setTimeout(typeWriter, 1000)
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
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
