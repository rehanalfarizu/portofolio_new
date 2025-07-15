const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { mockOperations } = require('../utils/mockData');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.get('/', skillController.getSkills);
  router.get('/stats', skillController.getSkillsStats);
  router.get('/:id', skillController.getSkillById);
  router.post('/', skillController.addSkill);
  router.put('/:id', skillController.updateSkill);
  router.delete('/:id', skillController.deleteSkill);
} else {
  // Mock data routes
  
  // GET all skills
  router.get('/', (req, res) => {
    try {
      const { search, page = 1, limit = 10, category } = req.query;
      let skills = mockOperations.getAll('skills');
      
      // Filter by category if provided
      if (category) {
        skills = skills.filter(skill => skill.category === category);
      }
      
      // Search if provided
      if (search) {
        skills = skills.filter(skill => 
          skill.name.toLowerCase().includes(search.toLowerCase()) ||
          skill.category.toLowerCase().includes(search.toLowerCase()) ||
          skill.level.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedSkills = skills.slice(startIndex, endIndex);
      
      res.json({
        success: true,
        data: paginatedSkills,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: skills.length,
          totalPages: Math.ceil(skills.length / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // GET skills stats
  router.get('/stats', (req, res) => {
    try {
      const skills = mockOperations.getAll('skills');
      const categories = [...new Set(skills.map(s => s.category))];
      const levels = [...new Set(skills.map(s => s.level))];
      
      const stats = {
        total: skills.length,
        categories: categories.length,
        levels: levels.length,
        by_category: categories.reduce((acc, cat) => {
          acc[cat] = skills.filter(s => s.category === cat).length;
          return acc;
        }, {}),
        by_level: levels.reduce((acc, level) => {
          acc[level] = skills.filter(s => s.level === level).length;
          return acc;
        }, {})
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

  // GET skill by ID
  router.get('/:id', (req, res) => {
    try {
      const skill = mockOperations.getById('skills', req.params.id);
      if (skill) {
        res.json({
          success: true,
          data: skill
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Skill not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST new skill
  router.post('/', (req, res) => {
    try {
      const newSkill = mockOperations.create('skills', req.body);
      res.status(201).json({
        success: true,
        data: newSkill,
        message: 'Skill created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  });

  // PUT update skill
  router.put('/:id', (req, res) => {
    try {
      const updated = mockOperations.update('skills', req.params.id, req.body);
      if (updated) {
        res.json({
          success: true,
          data: updated,
          message: 'Skill updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Skill not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // DELETE skill
  router.delete('/:id', (req, res) => {
    try {
      const deleted = mockOperations.delete('skills', req.params.id);
      if (deleted) {
        res.json({
          success: true,
          message: 'Skill deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Skill not found'
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