const { 
  initializeDatabase, 
  resetDatabase, 
  seedInitialData,
  createDatabaseIfNotExists,
  checkDatabaseStatus 
} = require('../models');

// Fungsi untuk menjalankan migrasi lengkap
async function runMigration() {
  try {
    console.log('🚀 Starting database migration process...\n');
    
    // Step 1: Buat database jika belum ada
    console.log('📝 Step 1: Ensuring database exists...');
    await createDatabaseIfNotExists();
    
    // Step 2: Initialize database
    console.log('\n🔄 Step 2: Initializing database...');
    await initializeDatabase({
      alter: true,  // Alter existing tables instead of dropping
      logging: console.log
    });
    
    // Step 3: Seed initial data
    console.log('\n🌱 Step 3: Seeding initial data...');
    await seedInitialData();
    
    // Step 4: Final status check
    console.log('\n📊 Step 4: Final database status check...');
    const status = await checkDatabaseStatus();
    
    console.log('\n✅ Migration completed successfully!');
    console.log('🎉 Your portfolio database is ready to use!');
    
    return status;
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Fungsi untuk fresh migration (hapus semua data)
async function runFreshMigration() {
  try {
    console.log('⚠️  WARNING: This will delete all existing data!');
    console.log('🚀 Starting fresh migration process...\n');
    
    // Konfirmasi untuk production
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Fresh migration is not allowed in production!');
      process.exit(1);
    }
    
    // Step 1: Buat database jika belum ada
    console.log('📝 Step 1: Ensuring database exists...');
    await createDatabaseIfNotExists();
    
    // Step 2: Reset database
    console.log('\n🔄 Step 2: Resetting database...');
    await resetDatabase();
    
    // Step 3: Seed initial data
    console.log('\n🌱 Step 3: Seeding initial data...');
    await seedInitialData();
    
    // Step 4: Final status check
    console.log('\n📊 Step 4: Final database status check...');
    const status = await checkDatabaseStatus();
    
    console.log('\n✅ Fresh migration completed successfully!');
    console.log('🎉 Your portfolio database is ready to use!');
    
    return status;
    
  } catch (error) {
    console.error('\n❌ Fresh migration failed:', error);
    process.exit(1);
  }
}

// Fungsi untuk check status saja
async function checkStatus() {
  try {
    console.log('📊 Checking database status...\n');
    const status = await checkDatabaseStatus();
    
    if (status.connected) {
      console.log('\n✅ Database is ready!');
    } else {
      console.log('\n❌ Database has issues that need to be resolved.');
    }
    
    return status;
    
  } catch (error) {
    console.error('\n❌ Status check failed:', error);
    process.exit(1);
  }
}

// Command line interface
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('🗃️  Portfolio Database Migration Tool\n');
  
  switch (command) {
    case 'migrate':
      await runMigration();
      break;
      
    case 'fresh':
      await runFreshMigration();
      break;
      
    case 'status':
      await checkStatus();
      break;
      
    case 'seed':
      try {
        console.log('🌱 Seeding initial data...');
        await seedInitialData();
        console.log('✅ Seeding completed!');
      } catch (error) {
        console.error('❌ Seeding failed:', error);
      }
      break;
      
    default:
      console.log('Usage:');
      console.log('  node scripts/migrate.js migrate  - Run migration (safe)');
      console.log('  node scripts/migrate.js fresh    - Fresh migration (drops all data)');
      console.log('  node scripts/migrate.js status   - Check database status');
      console.log('  node scripts/migrate.js seed     - Seed initial data only');
      console.log('');
      console.log('Examples:');
      console.log('  npm run migrate         - Run safe migration');
      console.log('  npm run migrate:fresh   - Run fresh migration');
      console.log('  npm run db:status       - Check database status');
      break;
  }
  
  process.exit(0);
}

// Jalankan script
main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});