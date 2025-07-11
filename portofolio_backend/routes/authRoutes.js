const express = require('express');
const router = express.Router();

// POST login
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint working', data: req.body });
});

// POST register
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint working', data: req.body });
});

// POST logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint working' });
});

module.exports = router;