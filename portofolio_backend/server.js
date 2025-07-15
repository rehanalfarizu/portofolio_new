const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Conditional database import
let sequelize, createDatabaseIfNotExists;
if (process.env.USE_DATABASE === 'true') {
  const dbModels = require('./models');
  sequelize = dbModels.sequelize;
  createDatabaseIfNotExists = dbModels.createDatabaseIfNotExists;
} else {
  // Mock database functions when database is disabled
  sequelize = {
    authenticate: async () => Promise.resolve(),
    sync: async () => Promise.resolve(),
    close: async () => Promise.resolve()
  };
  createDatabaseIfNotExists = async () => Promise.resolve();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'https://raihan-porto-6feb2zywg-raihans-projects-8608f0f4.vercel.app'
    ];

    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
console.log('📝 Importing routes...');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const biodataRoutes = require('./routes/biodataRoutes');
console.log('✅ All routes imported successfully');

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portfolio Backend API is running!',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      contactStats: '/api/contact/stats',
      test: '/api/contact/test',
      health: '/api/health'
    },
    database: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      port: process.env.DB_PORT
    }
  });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (process.env.USE_DATABASE === 'true') {
      await sequelize.authenticate();
    }
    res.json({
      success: true,
      message: 'Backend is healthy',
      timestamp: new Date().toISOString(),
      database: process.env.USE_DATABASE === 'true' ? 'connected' : 'disabled'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Backend is unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// API Routes
console.log('📝 Registering API routes...');
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/biodata', biodataRoutes);
console.log('✅ All API routes registered successfully');

// List all registered routes
console.log('📍 Registered API endpoints:');
console.log('   POST /api/auth/login');
console.log('   POST /api/auth/register');
console.log('   GET  /api/auth/verify');
console.log('   GET  /api/contact');
console.log('   POST /api/contact');
console.log('   GET  /api/contact/stats');
console.log('   GET  /api/dashboard/stats');
console.log('   GET  /api/projects');
console.log('   POST /api/projects');
console.log('   GET  /api/skills');
console.log('   POST /api/skills');
console.log('   GET  /api/experiences');
console.log('   POST /api/experiences');
console.log('   GET  /api/biodata');
console.log('   POST /api/biodata');
console.log('✅ All routes ready');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    path: req.path
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Gracefully shutting down...');
  await sequelize.close();
  process.exit(0);
});

// Start server
app.listen(PORT, async () => {
  try {
    console.log('🚀 Starting Portfolio Backend...');
    
    if (process.env.USE_DATABASE === 'true') {
      await createDatabaseIfNotExists();
      await sequelize.authenticate();
      console.log('✅ Database connected successfully');
      
      await sequelize.sync({ alter: true });
      console.log('✅ Database synchronized');
    } else {
      console.log('⚠️  Database is disabled (development mode)');
    }
    
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/contact/test`);
    console.log(`📊 Stats endpoint: http://localhost:${PORT}/api/contact/stats`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
});

module.exports = app;