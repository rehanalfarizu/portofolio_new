<template>
  <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-white">Visitor Statistics</h3>
      <div class="flex items-center space-x-2">
        <button
          @click="refreshStats"
          :disabled="isLoading"
          class="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          <svg :class="['w-4 h-4 text-white', { 'animate-spin': isLoading }]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <!-- Stats Grid -->
    <div v-else class="space-y-6">
      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-400">{{ stats.visitors?.total || 0 }}</div>
          <div class="text-sm text-gray-300">Total Visitors</div>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-400">{{ stats.visitors?.unique || 0 }}</div>
          <div class="text-sm text-gray-300">Unique Visitors</div>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-400">{{ stats.visitors?.today || 0 }}</div>
          <div class="text-sm text-gray-300">Today</div>
        </div>
        <div class="bg-gray-700 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-yellow-400">{{ stats.visitors?.thisMonth || 0 }}</div>
          <div class="text-sm text-gray-300">This Month</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Device Statistics Pie Chart -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h4 class="text-lg font-semibold text-white mb-4">Device Types</h4>
          <div class="relative h-64">
            <canvas ref="deviceChart"></canvas>
          </div>
        </div>

        <!-- Top Countries -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h4 class="text-lg font-semibold text-white mb-4">Top Countries</h4>
          <div class="space-y-3">
            <div v-if="stats.visitors?.topCountries?.length === 0" class="text-gray-400 text-center py-4">
              No country data available
            </div>
            <div v-else v-for="country in stats.visitors?.topCountries?.slice(0, 5)" :key="country.country" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-4 rounded-sm bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <span class="text-white">{{ country.country || 'Unknown' }}</span>
              </div>
              <span class="text-gray-300">{{ country.count || 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Browser Statistics -->
      <div class="bg-gray-700 p-4 rounded-lg">
        <h4 class="text-lg font-semibold text-white mb-4">Browser Distribution</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-if="stats.visitors?.browserStats?.length === 0" class="col-span-full text-gray-400 text-center py-4">
            No browser data available
          </div>
          <div v-else v-for="browser in stats.visitors?.browserStats?.slice(0, 4)" :key="browser.browser" class="text-center">
            <div class="text-xl font-bold text-blue-400">{{ browser.count || 0 }}</div>
            <div class="text-sm text-gray-300">{{ browser.browser || 'Unknown' }}</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-gray-700 p-4 rounded-lg">
        <h4 class="text-lg font-semibold text-white mb-4">Recent Activity</h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div v-if="recentVisits.length === 0" class="text-gray-400 text-center py-4">
            No recent activity
          </div>
          <div v-else v-for="visit in recentVisits.slice(0, 5)" :key="visit.id" class="flex items-center justify-between text-sm">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-gray-300">{{ visit.page_visited || 'Unknown page' }}</span>
            </div>
            <span class="text-gray-400">{{ formatTime(visit.visit_date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import dashboardService from '../services/dashboardService.js'

Chart.register(...registerables)

const stats = ref({})
const recentVisits = ref([])
const isLoading = ref(true)
const deviceChart = ref(null)
let deviceChartInstance = null

// Fetch visitor statistics
const fetchStats = async () => {
  try {
    isLoading.value = true
    const response = await dashboardService.getDashboardStats()

    if (response.success) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('Error fetching visitor stats:', error)
  } finally {
    isLoading.value = false
  }
}

// Fetch recent visitor analytics
const fetchRecentVisits = async () => {
  try {
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    const response = await dashboardService.getVisitorAnalytics({
      startDate,
      endDate,
      groupBy: 'hour'
    })

    if (response.success) {
      recentVisits.value = response.data || []
    }
  } catch (error) {
    console.error('Error fetching recent visits:', error)
  }
}

// Create device statistics pie chart
const createDeviceChart = () => {
  if (!deviceChart.value) return

  // Destroy existing chart
  if (deviceChartInstance) {
    deviceChartInstance.destroy()
  }

  const deviceStats = stats.value.visitors?.deviceStats || []

  if (deviceStats.length === 0) {
    // Show placeholder when no data
    const ctx = deviceChart.value.getContext('2d')
    ctx.fillStyle = '#6b7280'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('No device data available', deviceChart.value.width / 2, deviceChart.value.height / 2)
    return
  }

  const labels = deviceStats.map(device => device.device || 'Unknown')
  const data = deviceStats.map(device => parseInt(device.count) || 0)
  const colors = [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
  ]

  deviceChartInstance = new Chart(deviceChart.value, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderColor: '#1f2937',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#ffffff',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#374151',
          borderWidth: 1
        }
      }
    }
  })
}

// Format time for recent activity
const formatTime = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  } catch (error) {
    return 'Unknown'
  }
}

// Refresh all statistics
const refreshStats = async () => {
  await Promise.all([
    fetchStats(),
    fetchRecentVisits()
  ])

  // Recreate charts after data refresh
  await nextTick()
  createDeviceChart()
}

// Initialize component
onMounted(async () => {
  await refreshStats()
})

// Cleanup
onUnmounted(() => {
  if (deviceChartInstance) {
    deviceChartInstance.destroy()
  }
})

// Watch for stats changes and update chart
import { watch } from 'vue'
watch(() => stats.value.visitors?.deviceStats, () => {
  nextTick(() => {
    createDeviceChart()
  })
}, { deep: true })
</script>

<style scoped>
/* Custom scrollbar for recent activity */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
