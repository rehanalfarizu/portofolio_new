<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Header Section -->
    <div class="bg-gray-800 py-16 px-6 pt-20">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-center">My Projects</h1>
        <p class="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
          Berikut adalah koleksi proyek-proyek yang telah saya kerjakan. Setiap proyek mencerminkan
          perjalanan belajar dan pengembangan skill saya dalam web development, mulai dari aplikasi
          sederhana hingga sistem yang kompleks.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
        >
          <!-- Project Image -->
          <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <div v-else class="text-6xl">{{ project.icon }}</div>
            <!-- Status Badge -->
            <div v-if="project.status" class="absolute top-2 right-2">
              <span :class="[
                'px-2 py-1 text-xs rounded-full font-medium',
                project.status === 'active' ? 'bg-green-500 text-white' :
                project.status === 'completed' ? 'bg-blue-500 text-white' :
                'bg-gray-500 text-white'
              ]">
                {{ project.status }}
              </span>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold mb-3 text-white">{{ project.title }}</h3>
            <p class="text-gray-300 mb-4 text-sm leading-relaxed">{{ project.description }}</p>

            <!-- Technologies Used -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-gray-700 text-xs rounded-full text-blue-300 font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && projects.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">📁</div>
        <h3 class="text-xl font-semibold mb-2 text-gray-300">Belum ada proyek yang ditampilkan</h3>
        <p class="text-gray-400">Proyek-proyek akan segera hadir di sini.</p>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="bg-gray-800 py-16 px-6 mt-16">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Tertarik dengan karya saya?</h2>
        <p class="text-gray-300 mb-8 text-lg">
          Saya selalu terbuka untuk kolaborasi dan proyek menarik. Mari diskusikan ide Anda!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@example.com"
            class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Hubungi Saya
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
          >
            Lihat GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import crudService from '../services/crudService.js'
import dashboardService from '../services/dashboardService.js'

const projects = ref([])
const isLoading = ref(true)

// Fetch real projects from API
const fetchProjects = async () => {
  try {
    isLoading.value = true
    const response = await crudService.projects.getProjects({
      page: 1,
      limit: 100,
      status: 'active'
    })

    if (response.success) {
      // Transform data to match frontend structure
      projects.value = response.data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: Array.isArray(project.technologies)
          ? project.technologies
          : project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
        githubUrl: project.github_url || project.githubUrl,
        liveUrl: project.demo_url || project.liveUrl,
        icon: getProjectIcon(project.title), // Generate icon based on title
        imageUrl: project.image_url || null,
        status: project.status
      }))
    } else {
      console.error('Failed to fetch projects:', response.message)
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Fallback to sample data if API fails
    projects.value = sampleProjects
  } finally {
    isLoading.value = false
  }
}

// Generate icon based on project title/type
const getProjectIcon = (title) => {
  const titleLower = title.toLowerCase()
  if (titleLower.includes('ecommerce') || titleLower.includes('shop')) return '🛒'
  if (titleLower.includes('chat') || titleLower.includes('message')) return '💬'
  if (titleLower.includes('weather')) return '🌤️'
  if (titleLower.includes('blog') || titleLower.includes('cms')) return '📝'
  if (titleLower.includes('task') || titleLower.includes('todo')) return '📋'
  if (titleLower.includes('portfolio') || titleLower.includes('personal')) return '🎨'
  if (titleLower.includes('dashboard') || titleLower.includes('admin')) return '📊'
  if (titleLower.includes('game')) return '🎮'
  if (titleLower.includes('mobile') || titleLower.includes('app')) return '📱'
  if (titleLower.includes('api') || titleLower.includes('backend')) return '⚙️'
  return '💻' // Default icon
}

// Track visitor when page loads
const trackPageVisit = async () => {
  try {
    await dashboardService.trackVisit({
      pageVisited: '/projects',
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking visit:', error)
  }
}

// Sample fallback data
const sampleProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Platform e-commerce modern dengan fitur lengkap seperti shopping cart, payment gateway, dan admin dashboard. Dibangun dengan Vue.js dan Laravel.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://your-ecommerce-demo.com",
    icon: "�"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplikasi manajemen tugas dengan fitur drag & drop, real-time collaboration, dan notifikasi. Menggunakan Vue 3 composition API.",
    technologies: ["Vue 3", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://your-task-manager.com",
    icon: "📋"
  }
]

onMounted(async () => {
  await Promise.all([
    fetchProjects(),
    trackPageVisit()
  ])
})
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
