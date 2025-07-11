const express = require('express');
const router = express.Router();

// GET all biodata
router.get('/', (req, res) => {
  res.json({ message: 'Biodata endpoint working', data: [] });
});

// GET biodata by ID
router.get('/:id', (req, res) => {
  res.json({ message: 'Get biodata by ID working', id: req.params.id });
});

// POST new biodata
router.post('/', (req, res) => {
  res.json({ message: 'Add biodata working', data: req.body });
});

// PUT update biodata
router.put('/:id', (req, res) => {
  res.json({ message: 'Update biodata working', id: req.params.id });
});

// DELETE biodata
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete biodata working', id: req.params.id });
});

module.exports = router;