const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

console.log('🔥 LOADING NEW CONTACT ROUTES...');

// Basic endpoints
router.get('/test', contactController.testConnection);
router.get('/', contactController.getMessages);
router.post('/', contactController.addMessage);
router.get('/stats', contactController.getStats);

console.log('🔥 Basic contact routes loaded successfully');

// Admin endpoints
router.get('/admin/test', (req, res) => {
  console.log('🔥 Admin test endpoint called!');
  res.json({ success: true, message: 'Admin test endpoint working!' });
});

// Admin contact management
router.get('/admin/contacts', contactController.getAllContacts);
router.put('/admin/contacts/:id/read', contactController.markAsRead);
router.put('/admin/contacts/:id/reply', contactController.markAsReplied);
router.delete('/admin/contacts/:id', contactController.deleteContact);
router.get('/admin/stats', contactController.getDetailedStats);

console.log('🔥 Admin routes loaded successfully');

module.exports = router;
