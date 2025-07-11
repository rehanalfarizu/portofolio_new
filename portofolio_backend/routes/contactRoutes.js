// === backend/routes/contactRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

router.get('/', controller.getMessages);
router.post('/', controller.addMessage);

module.exports = router;
