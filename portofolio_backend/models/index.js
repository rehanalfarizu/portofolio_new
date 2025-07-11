const { sequelize, testConnection, syncDatabase, checkDatabaseStatus } = require('../config/database');

// Import semua model
const User = require('./user');
const Biodata = require('./biodata');
const Skill = require('./skill');
const Experience = require('./experience');
const Project = require('./project');
const Testimonial = require('./testimonial');
const Contact = require('./contact');
const Stat = require('./stat');

// Definisikan associations/relationships antar model
const setupAssociations = () => {
  try {
    console.log('🔗 Setting up model associations...');
    
    // User dan Biodata (One-to-One)
    if (User && Biodata) {
      User.hasOne(Biodata, { 
        foreignKey: 'user_id', 
        as: 'biodata',
        onDelete: 'CASCADE'
      });
      Biodata.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // User dan Skills (One-to-Many)
    if (User && Skill) {
      User.hasMany(Skill, { 
        foreignKey: 'user_id', 
        as: 'skills',
        onDelete: 'CASCADE'
      });
      Skill.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // User dan Experience (One-to-Many)
    if (User && Experience) {
      User.hasMany(Experience, { 
        foreignKey: 'user_id', 
        as: 'experiences',
        onDelete: 'CASCADE'
      });
      Experience.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // User dan Projects (One-to-Many)
    if (User && Project) {
      User.hasMany(Project, { 
        foreignKey: 'user_id', 
        as: 'projects',
        onDelete: 'CASCADE'
      });
      Project.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // User dan Testimonials (One-to-Many)
    if (User && Testimonial) {
      User.hasMany(Testimonial, { 
        foreignKey: 'user_id', 
        as: 'testimonials',
        onDelete: 'CASCADE'
      });
      Testimonial.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // User dan Stats (One-to-Many)
    if (User && Stat) {
      User.hasMany(Stat, { 
        foreignKey: 'user_id', 
        as: 'stats',
        onDelete: 'CASCADE'
      });
      Stat.belongsTo(User, { 
        foreignKey: 'user_id', 
        as: 'user'
      });
    }
    
    // Contact tidak perlu association karena bisa standalone
    
    console.log('✅ Model associations setup completed');
    
  } catch (error) {
    console.error('❌ Error setting up associations:', error);
    throw error;
  }
};

// Initialize database dengan langkah-langkah yang terstruktur
const initializeDatabase = async (options = {}) => {
  try {
    console.log('🚀 Initializing database...');
    
    // Step 1: Test connection
    console.log('📡 Step 1: Testing database connection...');
    await testConnection();
    
    // Step 2: Setup associations
    console.log('🔗 Step 2: Setting up model associations...');
    setupAssociations();
    
    // Step 3: Sync database
    console.log('🔄 Step 3: Synchronizing database...');
    await syncDatabase(options);
    
    // Step 4: Check final status
    console.log('📊 Step 4: Checking database status...');
    const status = await checkDatabaseStatus();
    
    console.log('✅ Database initialization completed successfully!');
    return status;
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Fungsi untuk reset database (development only)
const resetDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Database reset is not allowed in production!');
  }
  
  try {
    console.log('🔄 Resetting database...');
    
    // Drop semua tabel
    await sequelize.drop();
    console.log('🗑️  All tables dropped');
    
    // Setup associations lagi
    setupAssociations();
    
    // Sync dengan force
    await syncDatabase({ force: true });
    console.log('✅ Database reset completed');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  }
};

// Fungsi untuk seed data awal (opsional)
const seedInitialData = async () => {
  try {
    console.log('🌱 Seeding initial data...');
    
    // Cek apakah sudah ada data
    const userCount = await User.count();
    
    if (userCount === 0) {
      console.log('📝 Creating initial user...');
      
      // Buat user default
      const defaultUser = await User.create({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123', // Hash ini di model User
        role: 'admin',
        is_active: true
      });
      
      console.log('✅ Initial user created:', defaultUser.username);
      
      // Buat biodata default
      await Biodata.create({
        user_id: defaultUser.id,
        full_name: 'Portfolio Owner',
        title: 'Full Stack Developer',
        description: 'Welcome to my portfolio!',
        phone: '+62-xxx-xxx-xxxx',
        address: 'Indonesia',
        birth_date: '1990-01-01'
      });
      
      console.log('✅ Initial biodata created');
      
    } else {
      console.log('✅ Initial data already exists, skipping seed');
    }
    
  } catch (error) {
    console.error('❌ Error seeding initial data:', error);
    throw error;
  }
};

// Export semua yang diperlukan
module.exports = {
  // Database instance
  sequelize,
  
  // Database functions
  initializeDatabase,
  resetDatabase,
  seedInitialData,
  setupAssociations,
  
  // Models
  User,
  Biodata,
  Skill,
  Experience,
  Project,
  Testimonial,
  Contact,
  Stat,
  
  // Utility functions
  testConnection,
  syncDatabase,
  checkDatabaseStatus
};