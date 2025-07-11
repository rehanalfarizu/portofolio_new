// === backend/routes/testimonialRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/testimonialController');

router.get('/', controller.getTestimonials);
router.post('/', controller.addTestimonial);
router.delete('/:id', controller.deleteTestimonial);

module.exports = router;
