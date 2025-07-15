import { ref, onMounted } from 'vue'
import dashboardService from '../services/dashboardService.js'

export function useVisitorTracking() {
  const isTrackingEnabled = ref(true)
  const hasTracked = ref(false)

  const trackPageVisit = async (customData = {}) => {
    if (!isTrackingEnabled.value || hasTracked.value) {
      return
    }

    try {
      const pageData = {
        pageVisited: window.location.pathname,
        referrer: document.referrer,
        ...customData
      }

      await dashboardService.trackVisit(pageData)
      hasTracked.value = true

      console.log('📊 Page visit tracked:', pageData.pageVisited)
    } catch (error) {
      console.warn('Failed to track page visit:', error.message)
    }
  }

  const enableTracking = () => {
    isTrackingEnabled.value = true
  }

  const disableTracking = () => {
    isTrackingEnabled.value = false
  }

  // Auto-track on component mount
  onMounted(() => {
    trackPageVisit()
  })

  return {
    trackPageVisit,
    enableTracking,
    disableTracking,
    isTrackingEnabled,
    hasTracked
  }
}

// Composable for dashboard-specific tracking
export function useDashboardTracking() {
  const { trackPageVisit } = useVisitorTracking()

  const trackDashboardAccess = async (action = 'view') => {
    await trackPageVisit({
      pageVisited: '/dashboard',
      action,
      userType: 'admin'
    })
  }

  const trackAdminAction = async (action, details = {}) => {
    try {
      await dashboardService.trackVisit({
        pageVisited: '/dashboard',
        action,
        ...details
      })

      console.log('🔧 Admin action tracked:', action, details)
    } catch (error) {
      console.warn('Failed to track admin action:', error.message)
    }
  }

  return {
    trackDashboardAccess,
    trackAdminAction
  }
}
