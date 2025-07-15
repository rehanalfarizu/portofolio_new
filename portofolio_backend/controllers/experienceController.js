// === backend/controllers/experienceController.js ===
const { Experience } = require('../models');
const { Op } = require('sequelize');

// Get all experiences with pagination and search
exports.getExperience = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = ''
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { company: { [Op.iLike]: `%${search}%` } },
        { position: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Experience.findAndCountAll({
      where: whereClause,
      order: [['start_date', 'DESC']],
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
    console.error('Error getting experiences:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get experiences',
      error: error.message
    });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      description,
      start_date,
      end_date,
      is_current_job = false,
      location
    } = req.body;

    // Validation
    if (!company || !position || !start_date) {
      return res.status(400).json({
        success: false,
        message: 'Company, position, and start date are required'
      });
    }

    const experience = await Experience.create({
      company,
      position,
      description,
      startDate: start_date,
      endDate: is_current_job ? null : end_date,
      isCurrentJob: is_current_job,
      location
    });

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create experience',
      error: error.message
    });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findByPk(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    await experience.destroy();

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience',
      error: error.message
    });
  }
};

// Get experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findByPk(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Error getting experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get experience',
      error: error.message
    });
  }
};

// Update experience
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company,
      position,
      description,
      start_date,
      end_date,
      is_current_job,
      location
    } = req.body;

    const experience = await Experience.findByPk(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    await experience.update({
      company: company || experience.company,
      position: position || experience.position,
      description: description !== undefined ? description : experience.description,
      start_date: start_date || experience.start_date,
      end_date: is_current_job ? null : (end_date !== undefined ? end_date : experience.end_date),
      is_current_job: is_current_job !== undefined ? is_current_job : experience.is_current_job,
      location: location !== undefined ? location : experience.location
    });

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update experience',
      error: error.message
    });
  }
};

// Get experiences stats
exports.getExperienceStats = async (req, res) => {
  try {
    const total = await Experience.count();
    const current = await Experience.count({ where: { is_current_job: true } });
    const past = await Experience.count({ where: { is_current_job: false } });

    res.json({
      success: true,
      stats: {
        total,
        current,
        past
      }
    });
  } catch (error) {
    console.error('Error getting experience stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get experience stats',
      error: error.message
    });
  }
};