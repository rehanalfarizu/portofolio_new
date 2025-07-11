const { Biodata } = require('../models');

// GET all biodata
exports.getAllBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findAll();
    res.json({
      success: true,
      data: biodata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET biodata by ID
exports.getBiodataById = async (req, res) => {
  try {
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      return res.status(404).json({
        success: false,
        message: 'Biodata not found'
      });
    }
    res.json({
      success: true,
      data: biodata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE new biodata
exports.createBiodata = async (req, res) => {
  try {
    const { title, subtitle, description, avatarUrl } = req.body;
    
    const biodata = await Biodata.create({
      title,
      subtitle,
      description,
      avatarUrl
    });
    
    res.status(201).json({
      success: true,
      data: biodata
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE biodata
exports.updateBiodata = async (req, res) => {
  try {
    const { title, subtitle, description, avatarUrl } = req.body;
    
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      return res.status(404).json({
        success: false,
        message: 'Biodata not found'
      });
    }
    
    await biodata.update({
      title,
      subtitle,
      description,
      avatarUrl
    });
    
    res.json({
      success: true,
      data: biodata
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE biodata
exports.deleteBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      return res.status(404).json({
        success: false,
        message: 'Biodata not found'
      });
    }
    
    await biodata.destroy();
    res.json({
      success: true,
      message: 'Biodata deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};