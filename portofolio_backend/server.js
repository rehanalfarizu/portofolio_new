const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { sequelize, createDatabaseIfNotExists } = require('./models');

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
const contactRoutes = require('./routes/contactRoutes');

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
    await sequelize.authenticate();
    res.json({
      success: true,
      message: 'Backend is healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
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
app.use('/api/contact', contactRoutes);

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
    
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
    
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