const { Biodata } = require('../models');

async function addBiodataColumns() {
  try {
    // Add email column
    await Biodata.sequelize.query(`
      ALTER TABLE biodata 
      ADD COLUMN IF NOT EXISTS email VARCHAR(255);
    `);
    
    // Add phone column  
    await Biodata.sequelize.query(`
      ALTER TABLE biodata 
      ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
    `);
    
    // Add location column
    await Biodata.sequelize.query(`
      ALTER TABLE biodata 
      ADD COLUMN IF NOT EXISTS location VARCHAR(255);
    `);
    
    // Add website column
    await Biodata.sequelize.query(`
      ALTER TABLE biodata 
      ADD COLUMN IF NOT EXISTS website VARCHAR(255);
    `);
    
    console.log('✅ Biodata columns added successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding biodata columns:', error);
    process.exit(1);
  }
}

addBiodataColumns();
