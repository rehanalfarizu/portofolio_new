// === backend/routes/experienceRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');
const { mockOperations } = require('../utils/mockData');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.get('/', controller.getExperience);
  router.get('/stats', controller.getExperienceStats);
  router.get('/:id', controller.getExperienceById);
  router.post('/', controller.addExperience);
  router.put('/:id', controller.updateExperience);
  router.delete('/:id', controller.deleteExperience);
} else {
  // Mock data routes
  
  // GET all experiences
  router.get('/', (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      let experiences = search 
        ? mockOperations.search('experiences', search)
        : mockOperations.getAll('experiences');
      
      // Sort by date (newest first)
      experiences.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedExperiences = experiences.slice(startIndex, endIndex);
      
      res.json({
        success: true,
        data: paginatedExperiences,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: experiences.length,
          totalPages: Math.ceil(experiences.length / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // GET experience stats
  router.get('/stats', (req, res) => {
    try {
      const experiences = mockOperations.getAll('experiences');
      const stats = {
        total: experiences.length,
        current: experiences.filter(exp => exp.is_current).length,
        companies: [...new Set(experiences.map(exp => exp.company))].length,
        technologies: [...new Set(experiences.flatMap(exp => exp.technologies || []))].length
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

  // GET experience by ID
  router.get('/:id', (req, res) => {
    try {
      const experience = mockOperations.getById('experiences', req.params.id);
      if (experience) {
        res.json({
          success: true,
          data: experience
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST new experience
  router.post('/', (req, res) => {
    try {
      const newExperience = mockOperations.create('experiences', req.body);
      res.status(201).json({
        success: true,
        data: newExperience,
        message: 'Experience created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  });

  // PUT update experience
  router.put('/:id', (req, res) => {
    try {
      const updated = mockOperations.update('experiences', req.params.id, req.body);
      if (updated) {
        res.json({
          success: true,
          data: updated,
          message: 'Experience updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // DELETE experience
  router.delete('/:id', (req, res) => {
    try {
      const deleted = mockOperations.delete('experiences', req.params.id);
      if (deleted) {
        res.json({
          success: true,
          message: 'Experience deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });
}

module.exports = router;
