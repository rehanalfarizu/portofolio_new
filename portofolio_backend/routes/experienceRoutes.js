// === backend/routes/experienceRoutes.js ===
const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');

router.get('/', controller.getExperience);
router.post('/', controller.addExperience);
router.delete('/:id', controller.deleteExperience);

module.exports = router;
