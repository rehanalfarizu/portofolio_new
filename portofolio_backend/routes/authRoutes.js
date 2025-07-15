const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { mockOperations } = require('../utils/mockData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Check if database is enabled
const USE_DATABASE = process.env.USE_DATABASE === 'true';

if (USE_DATABASE) {
  // Database-based routes
  router.post('/login', authController.login);
  router.post('/register', authController.register);
  router.post('/logout', authController.logout);
  router.get('/verify', authController.verifyToken);
} else {
  // Mock data routes
  
  // POST login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }
      
      // Find user by email
      const users = mockOperations.getAll('users');
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // For demo purposes, accept 'admin123' as password for admin@portfolio.com
      const isValidPassword = (email === 'admin@portfolio.com' && password === 'admin123') ||
                             await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'mock-secret-key',
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        },
        message: 'Login successful'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST register  
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password, role = 'user' } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email and password are required'
        });
      }
      
      // Check if user already exists
      const users = mockOperations.getAll('users');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const newUser = mockOperations.create('users', {
        name,
        email,
        password: hashedPassword,
        role,
        is_active: true
      });
      
      res.status(201).json({
        success: true,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        message: 'User registered successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  // POST logout
  router.post('/logout', (req, res) => {
    // In a real implementation, you might blacklist the token
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });

  // GET verify token
  router.get('/verify', (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mock-secret-key');
      
      res.json({
        success: true,
        data: {
          user: {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
          }
        }
      });
      
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  });
}

module.exports = router;