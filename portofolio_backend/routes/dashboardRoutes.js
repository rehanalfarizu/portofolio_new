const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');
const { mockOperations } = require('../utils/mockData');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.get('/stats', controller.getDashboardStats);
  router.post('/track-visit', controller.trackVisit);
  router.get('/analytics', controller.getVisitorAnalytics);
} else {
  // Mock data routes
  
  // GET dashboard stats
  router.get('/stats', (req, res) => {
    try {
      const projects = mockOperations.getAll('projects');
      const skills = mockOperations.getAll('skills');
      const experiences = mockOperations.getAll('experiences');
      const contacts = mockOperations.getAll('contacts');
      
      const stats = {
        projects: {
          total: projects.length,
          featured: projects.filter(p => p.featured).length
        },
        skills: {
          total: skills.length,
          categories: [...new Set(skills.map(s => s.category))].length
        },
        experiences: {
          total: experiences.length,
          current: experiences.filter(e => e.is_current).length
        },
        contacts: {
          total: contacts.length,
          unread: contacts.filter(c => !c.is_read).length,
          today: contacts.filter(c => {
            const today = new Date();
            const contactDate = new Date(c.created_at);
            return contactDate.toDateString() === today.toDateString();
          }).length
        },
        visitors: {
          total: 1250,
          today: 45,
          thisWeek: 320,
          thisMonth: 1180
        }
      };
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST track visit
  router.post('/track-visit', (req, res) => {
    try {
      // In mock mode, just return success
      res.json({
        success: true,
        message: 'Visit tracked successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // GET visitor analytics
  router.get('/analytics', (req, res) => {
    try {
      // Mock analytics data
      const analytics = {
        pageViews: [
          { date: '2025-07-10', views: 45 },
          { date: '2025-07-11', views: 52 },
          { date: '2025-07-12', views: 38 },
          { date: '2025-07-13', views: 67 },
          { date: '2025-07-14', views: 41 },
          { date: '2025-07-15', views: 55 }
        ],
        topPages: [
          { page: '/', views: 125 },
          { page: '/projects', views: 89 },
          { page: '/about', views: 67 },
          { page: '/contact', views: 43 }
        ],
        devices: {
          desktop: 65,
          mobile: 30,
          tablet: 5
        },
        browsers: {
          chrome: 45,
          firefox: 25,
          safari: 20,
          edge: 10
        }
      };
      
      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });
}

module.exports = router;