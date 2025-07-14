<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header Section -->
    <header class="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <!-- Animated Stars -->
      <div class="absolute inset-0">
        <div
          v-for="star in stars"
          :key="star.id"
          class="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            animationDelay: star.delay + 's',
            animationDuration: star.duration + 's'
          }"
        ></div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 right-20 w-12 h-12 bg-gray-700 rounded-lg transform rotate-45 animate-float opacity-20"></div>
        <div class="absolute top-40 left-10 w-16 h-16 bg-gray-600 rounded-full animate-float-delayed opacity-30"></div>
        <div class="absolute bottom-40 right-40 w-8 h-8 bg-gray-500 rounded-full animate-bounce opacity-25"></div>
        <div class="absolute top-60 right-60 w-6 h-6 bg-gray-800 rounded-lg animate-float opacity-20"></div>
        <div class="absolute bottom-60 left-20 w-20 h-20 bg-gray-700 rounded-full opacity-15 animate-float-slow"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div class="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="animate-fade-in text-center lg:text-left">
            <h1 class="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm <span class="text-gray-300">Rehan</span>
            </h1>
            <p class="text-2xl md:text-3xl mb-6 text-gray-400">
              A <span class="text-white font-semibold">Designer</span> and
              <span class="text-white font-semibold">Developer</span>
            </p>
            <p class="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0">
              Passionate in Frontend Dev and UI/UX Design. I create beautiful, functional, and user-friendly digital experiences using the latest technologies.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                Get In Touch
              </button>
              <button class="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                View My Work
              </button>
            </div>
          </div>

          <!-- Right Content - Profile -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="absolute -inset-4 bg-gray-600 rounded-full blur opacity-10 animate-pulse"></div>
              <div class="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl flex items-center justify-center">
                <div class="text-6xl text-gray-400">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div class="flex space-x-12 text-center">
          <div>
            <div class="text-3xl font-bold text-white">2+</div>
            <div class="text-sm text-gray-500">Years Experience</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white">20+</div>
            <div class="text-sm text-gray-500">Projects Completed</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white">15+</div>
            <div class="text-sm text-gray-500">Happy Clients</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Skills Section -->
    <section class="py-20 px-6 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
            My Skills
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="relative">
          <!-- Carousel Track -->
          <div class="flex animate-carousel space-x-16">
            <!-- First set of skills -->
            <div class="flex space-x-16 flex-shrink-0">
              <div
                v-for="skill in skills"
                :key="skill.name + '-1'"
                class="group flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 border border-gray-700">
                  <span class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ skill.icon }}</span>
                </div>
                <h3 class="text-lg font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300">{{ skill.name }}</h3>
              </div>
            </div>

            <!-- Duplicate set for seamless loop -->
            <div class="flex space-x-16 flex-shrink-0">
              <div
                v-for="skill in skills"
                :key="skill.name + '-2'"
                class="group flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 border border-gray-700">
                  <span class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ skill.icon }}</span>
                </div>
                <h3 class="text-lg font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300">{{ skill.name }}</h3>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>

    <!-- Education Section -->
    <section class="py-20 px-6 bg-black">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
            My Education
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Academic journey that shaped my foundation
          </p>
        </div>

        <div class="space-y-8">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="relative bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-all duration-300 border border-gray-800"
          >
            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold mb-2 text-white">{{ edu.degree }}</h3>
                <p class="text-gray-300 font-semibold mb-2">{{ edu.institution }}</p>
                <p class="text-gray-500 text-sm mb-3">{{ edu.period }}</p>
                <p class="text-gray-400">{{ edu.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
            My Experience
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional journey and key milestones
          </p>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-600"></div>

          <div class="space-y-16">
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              class="relative"
            >
              <!-- Timeline dot -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10 border-4 border-black"></div>

              <!-- Content - Alternating sides -->
              <div class="flex items-center">
                <!-- Left side content (odd index) -->
                <div
                  v-if="index % 2 === 0"
                  class="w-1/2 pr-8 text-right"
                >
                  <h3 class="text-2xl font-bold mb-2 text-white">{{ exp.title }}</h3>
                  <p class="text-gray-300 font-semibold mb-2">{{ exp.company }}</p>
                  <p class="text-gray-500 text-sm mb-4">{{ exp.period }}</p>
                  <p class="text-gray-400 mb-4">{{ exp.description }}</p>
                  <div class="flex flex-wrap gap-2 justify-end">
                    <span
                      v-for="tech in exp.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Empty space for right side when content is on left -->
                <div v-if="index % 2 === 0" class="w-1/2"></div>

                <!-- Empty space for left side when content is on right -->
                <div v-if="index % 2 === 1" class="w-1/2"></div>

                <!-- Right side content (even index) -->
                <div
                  v-if="index % 2 === 1"
                  class="w-1/2 pl-8 text-left"
                >
                  <h3 class="text-2xl font-bold mb-2 text-white">{{ exp.title }}</h3>
                  <p class="text-gray-300 font-semibold mb-2">{{ exp.company }}</p>
                  <p class="text-gray-500 text-sm mb-4">{{ exp.period }}</p>
                  <p class="text-gray-400 mb-4">{{ exp.description }}</p>
                  <div class="flex flex-wrap gap-2 justify-start">
                    <span
                      v-for="tech in exp.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Generate random stars
const stars = ref([])
const generateStars = () => {
  for (let i = 0; i < 150; i++) {
    stars.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    })
  }
}

// Skills data
const skills = ref([
  { name: 'Vue.js', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'JavaScript', icon: '🔥' },
  { name: 'TypeScript', icon: '💎' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'UI/UX Design', icon: '🎨' },
  { name: 'Mobile Dev', icon: '📱' }
])

// Education data
const education = ref([
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University of Technology',
    period: '2018 - 2022',
    description: 'Specialized in Software Engineering and Web Development. Graduated with honors and was actively involved in coding competitions and tech communities.'
  },
  {
    degree: 'Full Stack Development Bootcamp',
    institution: 'Tech Academy',
    period: '2022',
    description: 'Intensive program focusing on modern web technologies including React, Node.js, and database management. Completed several real-world projects.'
  },
  {
    degree: 'UI/UX Design Certificate',
    institution: 'Design Institute',
    period: '2021',
    description: 'Comprehensive course covering user research, prototyping, and modern design principles. Learned industry-standard tools and methodologies.'
  }
])

// Experience data
const experiences = ref([
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: '2023 - Present',
    description: 'Leading frontend development team, architecting scalable solutions, and mentoring junior developers. Responsible for implementing modern design systems and optimizing application performance.',
    technologies: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'GraphQL']
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency Pro',
    period: '2022 - 2023',
    description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create responsive and user-friendly interfaces.',
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Express.js', 'React']
  },
  {
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2021 - 2022',
    description: 'Built responsive web applications from ground up. Worked closely with UX/UI designers to implement pixel-perfect designs and ensure optimal user experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Sass']
  }
])

onMounted(() => {
  generateStars()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes floatDelayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-180deg); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
}

@keyframes carousel {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: floatSlow 10s ease-in-out infinite;
}

.animate-carousel {
  animation: carousel 20s linear infinite;
}

.animate-carousel:hover {
  animation-play-state: paused;
}
</style>
