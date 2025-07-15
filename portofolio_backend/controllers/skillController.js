// === backend/controllers/skillController.js ===
const { Skill } = require('../models');
const { Op } = require('sequelize');

// Get all skills with pagination and search
exports.getSkills = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      level = ''
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { level: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (level) {
      whereClause.level = level;
    }

    const { count, rows } = await Skill.findAndCountAll({
      where: whereClause,
      order: [['name', 'ASC']],
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
    console.error('Error getting skills:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get skills',
      error: error.message
    });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { name, level } = req.body;

    // Validation
    if (!name || !level) {
      return res.status(400).json({
        success: false,
        message: 'Name and level are required'
      });
    }

    const skill = await Skill.create({
      name,
      level
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create skill',
      error: error.message
    });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    
    const skill = await Skill.findByPk(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await skill.destroy();

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill',
      error: error.message
    });
  }
};

// Get skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const skill = await Skill.findByPk(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Error getting skill:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get skill',
      error: error.message
    });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    const skill = await Skill.findByPk(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await skill.update({
      name: name || skill.name,
      level: level || skill.level
    });

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update skill',
      error: error.message
    });
  }
};

// Get skills stats
exports.getSkillsStats = async (req, res) => {
  try {
    const total = await Skill.count();
    const beginner = await Skill.count({ where: { level: 'Beginner' } });
    const intermediate = await Skill.count({ where: { level: 'Intermediate' } });
    const advanced = await Skill.count({ where: { level: 'Advanced' } });
    const expert = await Skill.count({ where: { level: 'Expert' } });

    res.json({
      success: true,
      stats: {
        total,
        beginner,
        intermediate,
        advanced,
        expert
      }
    });
  } catch (error) {
    console.error('Error getting skills stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get skills stats',
      error: error.message
    });
  }
};
