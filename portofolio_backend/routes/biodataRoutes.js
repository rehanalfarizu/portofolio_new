const express = require('express');
const router = express.Router();
const biodataController = require('../controllers/biodataController');
const { mockOperations } = require('../utils/mockData');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.get('/', biodataController.getAllBiodata);
  router.get('/:id', biodataController.getBiodataById);
  router.post('/', biodataController.createBiodata);
  router.put('/:id', biodataController.updateBiodata);
  router.delete('/:id', biodataController.deleteBiodata);
} else {
  // Mock data routes
  
  // GET all biodata
  router.get('/', (req, res) => {
    try {
      const biodata = mockOperations.getAll('biodata');
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
  });

  // GET biodata by ID
  router.get('/:id', (req, res) => {
    try {
      const biodata = mockOperations.getById('biodata', req.params.id);
      if (biodata) {
        res.json({
          success: true,
          data: biodata
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Biodata not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST new biodata
  router.post('/', (req, res) => {
    try {
      // Map frontend fields to backend fields
      const { name, title, bio, email, phone, location, website } = req.body;
      
      const biodataData = {
        title: name || 'Unknown', // Map name to title
        subtitle: title || '', // Map title to subtitle
        description: bio || '', // Map bio to description
        email: email || null,
        phone: phone || null,
        location: location || null,
        website: website || null,
        user_id: 1 // Default user_id for mock data
      };
      
      const newBiodata = mockOperations.create('biodata', biodataData);
      res.status(201).json({
        success: true,
        data: newBiodata,
        message: 'Biodata created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  });

  // PUT update biodata
  router.put('/:id', (req, res) => {
    try {
      // Map frontend fields to backend fields
      const { name, title, bio, email, phone, location, website } = req.body;
      
      const updateData = {
        title: name, // Map name to title
        subtitle: title, // Map title to subtitle
        description: bio, // Map bio to description
        email,
        phone,
        location,
        website
      };
      
      const updated = mockOperations.update('biodata', req.params.id, updateData);
      if (updated) {
        res.json({
          success: true,
          data: updated,
          message: 'Biodata updated successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Biodata not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // DELETE biodata
  router.delete('/:id', (req, res) => {
    try {
      const deleted = mockOperations.delete('biodata', req.params.id);
      if (deleted) {
        res.json({
          success: true,
          message: 'Biodata deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Biodata not found'
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