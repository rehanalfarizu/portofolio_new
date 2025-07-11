const express = require('express');
const router = express.Router();

// GET all skills
router.get('/skills', (req, res) => {
  res.json({ message: 'Skills endpoint' });
});

// GET skill by ID
router.get('/skills/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Skill with ID: ${id}` });
});

// POST new skill
router.post('/skills', (req, res) => {
  res.json({ message: 'Create skill endpoint' });
});

// PUT update skill
router.put('/skills/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Update skill with ID: ${id}` });
});

// DELETE skill
router.delete('/skills/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete skill with ID: ${id}` });
});

module.exports = router;