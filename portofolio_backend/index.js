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
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models dengan error handling
let models = {};

try {
  const User = require('./user')(sequelize);
  const Project = require('./project')(sequelize);
  const Skill = require('./skill')(sequelize);
  const Experience = require('./experience')(sequelize);
  const Education = require('./education')(sequelize);
  const Contact = require('./contact')(sequelize);
  const Biodata = require('./biodata')(sequelize); // Tambahkan Biodata

  // Define models object
  models = {
    User,
    Project,
    Skill,
    Experience,
    Education,
    Contact,
    Biodata
  };

} catch (error) {
  console.error('Error loading models:', error.message);
  throw error;
}

// Setup associations if needed
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Function to create database if not exists
async function createDatabaseIfNotExists() {
  try {
    // Create a connection without specifying database
    const adminSequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      logging: false
    });

    // Check if database exists, if not create it
    const databaseName = process.env.DB_NAME || 'portofolio_db';
    
    try {
      await adminSequelize.query(`CREATE DATABASE "${databaseName}"`, {
        type: Sequelize.QueryTypes.RAW
      });
      console.log(`✅ Database "${databaseName}" created successfully`);
    } catch (err) {
      // Database might already exist
      if (err.message.includes('already exists')) {
        console.log(`ℹ️  Database "${databaseName}" already exists`);
      } else {
        throw err;
      }
    }

    await adminSequelize.close();
    
    // Test connection to the actual database
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    throw error;
  }
}

module.exports = {
  sequelize,
  Sequelize,
  createDatabaseIfNotExists,
  ...models
};