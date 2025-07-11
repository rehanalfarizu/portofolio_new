const { Sequelize } = require('sequelize');
require('dotenv').config();

// Konfigurasi database dengan environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME || 'portofolio_db',
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      // Untuk SSL jika diperlukan (production)
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false
      // }
    },
    // Timezone configuration untuk PostgreSQL
    timezone: '+07:00', // WIB timezone
    define: {
      // Gunakan timestamp dengan timezone
      timestamps: true,
      // Gunakan snake_case untuk nama kolom
      underscored: true,
      // Gunakan soft delete
      paranoid: true,
      // Freeze table names (jangan pluralisasi otomatis)
      freezeTableName: true,
      // Charset untuk konsistensi
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  }
);

// Test koneksi database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Test basic query
    const result = await sequelize.query('SELECT version()');
    console.log('📊 PostgreSQL Version:', result[0][0].version);
    
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    
    // Berikan saran berdasarkan error yang umum
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Suggestion: Make sure PostgreSQL service is running');
      console.log('   - Windows: Start PostgreSQL service from Services');
      console.log('   - macOS: brew services start postgresql');
      console.log('   - Linux: sudo systemctl start postgresql');
    } else if (error.code === '3D000') {
      console.log('💡 Suggestion: Database does not exist. Create it first:');
      console.log('   createdb portofolio_db -U postgres');
    } else if (error.code === '28P01') {
      console.log('💡 Suggestion: Check your database credentials in .env file');
    }
    
    process.exit(1);
  }
};

// Sync database models dengan opsi yang lebih aman
const syncDatabase = async (options = {}) => {
  try {
    const defaultOptions = {
      force: false,        // Jangan drop tables yang sudah ada
      alter: true,         // Alter tables jika ada perubahan struktur
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    };
    
    const syncOptions = { ...defaultOptions, ...options };
    
    console.log('🔄 Synchronizing database...');
    console.log('⚙️  Sync options:', syncOptions);
    
    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized successfully.');
    
    // Tampilkan informasi tabel yang dibuat/diupdate
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    console.log('📋 Tables in database:', tableNames);
    
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

// Fungsi untuk force sync (hati-hati, akan menghapus semua data)
const forceSyncDatabase = async () => {
  console.log('⚠️  WARNING: This will drop all tables and recreate them!');
  console.log('⚠️  All data will be lost!');
  
  if (process.env.NODE_ENV === 'production') {
    console.log('❌ Force sync is not allowed in production!');
    return;
  }
  
  try {
    await syncDatabase({ force: true });
    console.log('✅ Database force synchronized successfully.');
  } catch (error) {
    console.error('❌ Error force synchronizing database:', error);
    throw error;
  }
};

// Fungsi untuk mengecek status database
const checkDatabaseStatus = async () => {
  try {
    // Cek koneksi
    await sequelize.authenticate();
    
    // Cek tabel yang ada
    const tables = await sequelize.getQueryInterface().showAllTables();
    
    // Cek versi PostgreSQL
    const result = await sequelize.query('SELECT version()');
    const version = result[0][0].version;
    
    console.log('📊 Database Status:');
    console.log('  ✅ Connection: OK');
    console.log('  📋 Tables:', tables.length > 0 ? tables.join(', ') : 'No tables found');
    console.log('  🔢 PostgreSQL Version:', version.split(' ')[0] + ' ' + version.split(' ')[1]);
    
    return {
      connected: true,
      tables,
      version
    };
    
  } catch (error) {
    console.log('📊 Database Status:');
    console.log('  ❌ Connection: FAILED');
    console.log('  🔍 Error:', error.message);
    
    return {
      connected: false,
      error: error.message
    };
  }
};

// Fungsi untuk membuat database jika belum ada
const createDatabaseIfNotExists = async () => {
  const { Client } = require('pg');
  
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    // Tidak sertakan database name untuk membuat database baru
  });

  try {
    await client.connect();
    
    // Cek apakah database sudah ada
    const dbName = process.env.DB_NAME || 'portofolio_db';
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName]
    );
    
    if (result.rows.length === 0) {
      console.log(`📝 Creating database: ${dbName}`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database ${dbName} created successfully`);
    } else {
      console.log(`✅ Database ${dbName} already exists`);
    }
    
  } catch (error) {
    if (error.code === '42P04') {
      console.log('✅ Database already exists');
    } else {
      console.error('❌ Error creating database:', error.message);
      throw error;
    }
  } finally {
    await client.end();
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  forceSyncDatabase,
  checkDatabaseStatus,
  createDatabaseIfNotExists
};