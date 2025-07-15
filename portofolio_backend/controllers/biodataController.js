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
    const { name, title, bio, email, phone, location, website } = req.body;
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    const biodataData = {
      title: name, // Map name to title field
      subtitle: title || '', // Map title to subtitle field  
      description: bio || '', // Map bio to description field
      email: email || null,
      phone: phone || null,
      location: location || null,
      website: website || null,
      user_id: req.user?.id || 6 // Default user_id if not provided
    };
    
    const biodata = await Biodata.create(biodataData);
    
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
    const { name, title, bio, email, phone, location, website } = req.body;
    
    const biodata = await Biodata.findByPk(req.params.id);
    if (!biodata) {
      return res.status(404).json({
        success: false,
        message: 'Biodata not found'
      });
    }
    
    await biodata.update({
      title: name, // Map name to title field
      subtitle: title, // Map title to subtitle field  
      description: bio, // Map bio to description field
      email,
      phone,
      location,
      website
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