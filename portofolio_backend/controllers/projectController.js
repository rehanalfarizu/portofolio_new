const { Project } = require('../models'); // Import dari models index
const { Op } = require('sequelize');

// Get all projects with pagination and search
exports.getProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = ''
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { technologies: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
      error: error.message
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image_url,
      github_url,
      demo_url,
      technologies,
      status = 'active'
    } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const project = await Project.create({
      title,
      description,
      image_url,
      github_url,
      demo_url,
      technologies,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project',
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image_url,
      github_url,
      demo_url,
      technologies,
      status
    } = req.body;

    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update({
      title: title || project.title,
      description: description !== undefined ? description : project.description,
      image_url: image_url !== undefined ? image_url : project.image_url,
      github_url: github_url !== undefined ? github_url : project.github_url,
      demo_url: demo_url !== undefined ? demo_url : project.demo_url,
      technologies: technologies !== undefined ? technologies : project.technologies,
      status: status || project.status
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

// Get projects stats
exports.getProjectsStats = async (req, res) => {
  try {
    const total = await Project.count();
    const active = await Project.count({ where: { status: 'active' } });
    const completed = await Project.count({ where: { status: 'completed' } });
    const inactive = await Project.count({ where: { status: 'inactive' } });

    res.json({
      success: true,
      stats: {
        total,
        active,
        completed,
        inactive
      }
    });
  } catch (error) {
    console.error('Error getting projects stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects stats',
      error: error.message
    });
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