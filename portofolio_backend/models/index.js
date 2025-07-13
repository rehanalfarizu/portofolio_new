const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
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

// Function untuk membuat database jika belum ada
const createDatabaseIfNotExists = async () => {
  try {
    const tempSequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: 'postgres', // Connect ke default postgres database
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      logging: false
    });

    // Cek apakah database sudah ada
    const [results] = await tempSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME || 'portofolio_db'}'`
    );

    if (results.length === 0) {
      // Buat database baru
      await tempSequelize.query(
        `CREATE DATABASE "${process.env.DB_NAME || 'portofolio_db'}"`
      );
      console.log(`✅ Database "${process.env.DB_NAME || 'portofolio_db'}" created successfully`);
    } else {
      console.log(`✅ Database "${process.env.DB_NAME || 'portofolio_db'}" already exists`);
    }

    await tempSequelize.close();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    throw error;
  }
};

// Auto-load semua model dari folder models
const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Setup associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.createDatabaseIfNotExists = createDatabaseIfNotExists;
db.testConnection = testConnection;
db.syncDatabase = syncDatabase;

module.exports = db;