import api from './api.js'

// =====================================
// PROJECTS CRUD SERVICE
// =====================================
export const projectService = {
  // Get all projects
  async getProjects(options = {}) {
    try {
      const { page = 1, limit = 10, search = '', status = '' } = options
      const params = new URLSearchParams()

      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)
      if (status) params.append('status', status)

      const response = await api.get(`/api/projects?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting projects:', error)
      throw error
    }
  },

  // Get single project
  async getProject(id) {
    try {
      const response = await api.get(`/api/projects/${id}`)
      return response.data
    } catch (error) {
      console.error('Error getting project:', error)
      throw error
    }
  },

  // Create new project
  async createProject(projectData) {
    try {
      const response = await api.post('/api/projects', projectData)
      return response.data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  // Update project
  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/api/projects/${id}`, projectData)
      return response.data
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  // Delete project
  async deleteProject(id) {
    try {
      const response = await api.delete(`/api/projects/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  // Get projects stats
  async getProjectsStats() {
    try {
      const response = await api.get('/api/projects/stats')
      return response.data
    } catch (error) {
      console.error('Error getting projects stats:', error)
      throw error
    }
  }
}

// =====================================
// SKILLS CRUD SERVICE
// =====================================
export const skillService = {
  // Get all skills
  async getSkills(options = {}) {
    try {
      const { page = 1, limit = 10, search = '', level = '' } = options
      const params = new URLSearchParams()

      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)
      if (level) params.append('level', level)

      const response = await api.get(`/api/skills?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting skills:', error)
      throw error
    }
  },

  // Get single skill
  async getSkill(id) {
    try {
      const response = await api.get(`/api/skills/${id}`)
      return response.data
    } catch (error) {
      console.error('Error getting skill:', error)
      throw error
    }
  },

  // Create new skill
  async createSkill(skillData) {
    try {
      const response = await api.post('/api/skills', skillData)
      return response.data
    } catch (error) {
      console.error('Error creating skill:', error)
      throw error
    }
  },

  // Update skill
  async updateSkill(id, skillData) {
    try {
      const response = await api.put(`/api/skills/${id}`, skillData)
      return response.data
    } catch (error) {
      console.error('Error updating skill:', error)
      throw error
    }
  },

  // Delete skill
  async deleteSkill(id) {
    try {
      const response = await api.delete(`/api/skills/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting skill:', error)
      throw error
    }
  },

  // Get skills stats
  async getSkillsStats() {
    try {
      const response = await api.get('/api/skills/stats')
      return response.data
    } catch (error) {
      console.error('Error getting skills stats:', error)
      throw error
    }
  }
}

// =====================================
// EXPERIENCES CRUD SERVICE
// =====================================
export const experienceService = {
  // Get all experiences
  async getExperiences(options = {}) {
    try {
      const { page = 1, limit = 10, search = '' } = options
      const params = new URLSearchParams()

      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)

      const response = await api.get(`/api/experiences?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting experiences:', error)
      throw error
    }
  },

  // Get single experience
  async getExperience(id) {
    try {
      const response = await api.get(`/api/experiences/${id}`)
      return response.data
    } catch (error) {
      console.error('Error getting experience:', error)
      throw error
    }
  },

  // Create new experience
  async createExperience(experienceData) {
    try {
      const response = await api.post('/api/experiences', experienceData)
      return response.data
    } catch (error) {
      console.error('Error creating experience:', error)
      throw error
    }
  },

  // Update experience
  async updateExperience(id, experienceData) {
    try {
      const response = await api.put(`/api/experiences/${id}`, experienceData)
      return response.data
    } catch (error) {
      console.error('Error updating experience:', error)
      throw error
    }
  },

  // Delete experience
  async deleteExperience(id) {
    try {
      const response = await api.delete(`/api/experiences/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting experience:', error)
      throw error
    }
  },

  // Get experiences stats
  async getExperienceStats() {
    try {
      const response = await api.get('/api/experiences/stats')
      return response.data
    } catch (error) {
      console.error('Error getting experience stats:', error)
      throw error
    }
  }
}

// =====================================
// BIODATA CRUD SERVICE
// =====================================
export const biodataService = {
  // Get all biodata
  async getBiodata(options = {}) {
    try {
      const { page = 1, limit = 10, search = '' } = options
      const params = new URLSearchParams()

      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)

      const response = await api.get(`/api/biodata?${params}`)
      return response.data
    } catch (error) {
      console.error('Error getting biodata:', error)
      throw error
    }
  },

  // Get single biodata
  async getBiodataById(id) {
    try {
      const response = await api.get(`/api/biodata/${id}`)
      return response.data
    } catch (error) {
      console.error('Error getting biodata:', error)
      throw error
    }
  },

  // Create new biodata
  async createBiodata(biodataData) {
    try {
      const response = await api.post('/api/biodata', biodataData)
      return response.data
    } catch (error) {
      console.error('Error creating biodata:', error)
      throw error
    }
  },

  // Update biodata
  async updateBiodata(id, biodataData) {
    try {
      const response = await api.put(`/api/biodata/${id}`, biodataData)
      return response.data
    } catch (error) {
      console.error('Error updating biodata:', error)
      throw error
    }
  },

  // Delete biodata
  async deleteBiodata(id) {
    try {
      const response = await api.delete(`/api/biodata/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting biodata:', error)
      throw error
    }
  }
}

// =====================================
// COMBINED CRUD SERVICE
// =====================================
export const crudService = {
  projects: projectService,
  skills: skillService,
  experiences: experienceService,
  biodata: biodataService
}

export default crudService
