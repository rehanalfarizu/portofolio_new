const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET all projects
router.get('/', projectController.getProjects);

// GET project by ID
router.get('/:id', projectController.getProjectById);

// POST new project
router.post('/', projectController.addProject);

// PUT update project
router.put('/:id', projectController.updateProject);

// DELETE project
router.delete('/:id', projectController.deleteProject);

module.exports = router;