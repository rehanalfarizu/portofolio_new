const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { mockOperations } = require('../utils/mockData');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.get('/', projectController.getProjects);
  router.get('/stats', projectController.getProjectsStats);
  router.get('/:id', projectController.getProjectById);
  router.post('/', projectController.addProject);
  router.put('/:id', projectController.updateProject);
  router.delete('/:id', projectController.deleteProject);
} else {
  // Mock data routes
  
  // GET all projects
  router.get('/', (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      let projects = search 
        ? mockOperations.search('projects', search)
        : mockOperations.getAll('projects');
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedProjects = projects.slice(startIndex, endIndex);
      
      res.json({
        success: true,
        data: paginatedProjects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: projects.length,
          totalPages: Math.ceil(projects.length / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // GET projects stats
  router.get('/stats', (req, res) => {
    try {
      const projects = mockOperations.getAll('projects');
      const stats = {
        total: projects.length,
        featured: projects.filter(p => p.featured).length,
        technologies: [...new Set(projects.flatMap(p => p.technologies || []))].length
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

  // GET project by ID  
  router.get('/:id', (req, res) => {
    try {
      const project = mockOperations.getById('projects', req.params.id);
      if (project) {
        res.json({
          success: true,
          data: project
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST new project
  router.post('/', (req, res) => {
    try {
      const newProject = mockOperations.create('projects', req.body);
      res.status(201).json({
        success: true,
        data: newProject,
        message: 'Project created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  });

  // PUT update project
  router.put('/:id', (req, res) => {
    try {
      const updated = mockOperations.update('projects', req.params.id, req.body);
      if (updated) {
        res.json({
          success: true,
          data: updated,
          message: 'Project updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // DELETE project
  router.delete('/:id', (req, res) => {
    try {
      const deleted = mockOperations.delete('projects', req.params.id);
      if (deleted) {
        res.json({
          success: true,
          message: 'Project deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Project not found'
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