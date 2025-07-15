import api from './api.js'

const dashboardService = {
  // Get comprehensive dashboard statistics
  async getDashboardStats() {
    try {
      const response = await api.get('/api/dashboard/stats')
      return response.data
    } catch (error) {
      console.error('Error getting dashboard stats:', error)
      throw error
    }
  },

  // Track visitor statistics
  async trackVisit(visitData = {}) {
    try {
      // Gather basic visitor information
      const payload = {
        userAgent: navigator.userAgent,
        pageVisited: window.location.href,
        referrer: document.referrer,
        sessionId: this.getSessionId(),
        ...visitData
      }

      // Try to get additional device/browser info
      if (typeof window !== 'undefined') {
        payload.device = this.getDeviceType()
        payload.browser = this.getBrowserName()
        payload.os = this.getOS()
      }

      const response = await api.post('/api/dashboard/track-visit', payload)
      return response.data
    } catch (error) {
      console.error('Error tracking visit:', error)
      // Don't throw error for tracking to avoid breaking user experience
      return { success: false, error: error.message }
    }
  },

  // Get visitor analytics with date range
  async getVisitorAnalytics(options = {}) {
    try {
      const { startDate, endDate, groupBy = 'day' } = options
      const params = new URLSearchParams()

      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      params.append('groupBy', groupBy)

      const response = await api.get(`/api/dashboard/analytics?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting visitor analytics:', error)
      throw error
    }
  },

  // Contact management functions
  async getContacts(options = {}) {
    try {
      const { page = 1, limit = 10, search = '', status = '' } = options
      const params = new URLSearchParams()

      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)
      if (status) params.append('status', status)

      const response = await api.get(`/api/contact/admin/contacts?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting contacts:', error)
      throw error
    }
  },

  async getContactStats() {
    try {
      const response = await api.get('/api/contact/admin/stats')
      return response.data
    } catch (error) {
      console.error('Error getting contact stats:', error)
      throw error
    }
  },

  async markContactAsRead(contactId) {
    try {
      const response = await api.put(`/api/contact/admin/contacts/${contactId}/read`)
      return response.data
    } catch (error) {
      console.error('Error marking contact as read:', error)
      throw error
    }
  },

  async markContactAsReplied(contactId) {
    try {
      const response = await api.put(`/api/contact/admin/contacts/${contactId}/reply`)
      return response.data
    } catch (error) {
      console.error('Error marking contact as replied:', error)
      throw error
    }
  },

  async deleteContact(contactId) {
    try {
      const response = await api.delete(`/api/contact/admin/contacts/${contactId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting contact:', error)
      throw error
    }
  },

  // Utility functions for visitor tracking
  getSessionId() {
    let sessionId = sessionStorage.getItem('portfolio_session_id')
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('portfolio_session_id', sessionId)
    }
    return sessionId
  },

  getDeviceType() {
    const userAgent = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet'
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile'
    }
    return 'desktop'
  },

  getBrowserName() {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'
    return 'Unknown'
  },

  getOS() {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'MacOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }
}

export default dashboardService
