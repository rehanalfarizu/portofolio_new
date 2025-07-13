const { Sequelize } = require('sequelize');
require('dotenv').config();

// Konfigurasi database
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'portofolio_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Test koneksi database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Get database version
    const [results] = await sequelize.query('SELECT version()');
    console.log('📊 PostgreSQL Version:', results[0].version);
    
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Sync database
const syncDatabase = async (options = {}) => {
  try {
    console.log('🔄 Syncing database...');
    
    const syncOptions = {
      force: false,
      alter: false,
      logging: console.log,
      ...options
    };
    
    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized successfully');
    
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};

// Check database status
const checkDatabaseStatus = async () => {
  try {
    const status = {
      connected: false,
      version: null,
      tables: [],
      modelCount: 0
    };
    
    // Test connection
    await sequelize.authenticate();
    status.connected = true;
    
    // Get version
    const [versionResults] = await sequelize.query('SELECT version()');
    status.version = versionResults[0].version;
    
    // Get tables
    const [tableResults] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    status.tables = tableResults.map(row => row.table_name);
    
    // Get model count
    status.modelCount = Object.keys(sequelize.models).length;
    
    console.log('📊 Database Status:');
    console.log('  - Connected:', status.connected);
    console.log('  - Tables:', status.tables.length);
    console.log('  - Models:', status.modelCount);
    console.log('  - Table List:', status.tables.join(', '));
    
    return status;
    
  } catch (error) {
    console.error('❌ Database status check failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  checkDatabaseStatus
};