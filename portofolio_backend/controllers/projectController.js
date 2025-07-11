const Project = require('../models/project'); // Import langsung dari model

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ 
      where: { id: req.params.id } 
    });
    
    if (deleted) {
      res.json({ success: true, message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambahan: Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambahan: Update project
exports.updateProject = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};