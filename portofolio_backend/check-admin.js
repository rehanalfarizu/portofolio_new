const { User } = require('./models');
const { sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function checkAndFixAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Check if admin user exists
    const adminUser = await User.findOne({
      where: { email: 'admin@portfolio.com' }
    });
    
    if (!adminUser) {
      console.log('❌ Admin user not found. Creating new admin user...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = await User.create({
        name: 'Portfolio Admin',
        email: 'admin@portfolio.com',
        password: hashedPassword,
        role: 'admin',
        is_active: true
      });
      
      console.log('✅ Admin user created successfully');
      console.log(`   - ID: ${newAdmin.id}`);
      console.log(`   - Email: ${newAdmin.email}`);
      console.log(`   - Role: ${newAdmin.role}`);
    } else {
      console.log('✅ Admin user found');
      console.log(`   - ID: ${adminUser.id}`);
      console.log(`   - Email: ${adminUser.email}`);
      console.log(`   - Role: ${adminUser.role}`);
      console.log(`   - Active: ${adminUser.is_active}`);
      
      // Test password verification
      const passwordTest = await bcrypt.compare('admin123', adminUser.password);
      console.log(`   - Password test: ${passwordTest ? '✅ Valid' : '❌ Invalid'}`);
      
      if (!passwordTest) {
        console.log('🔧 Fixing password...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await adminUser.update({ password: hashedPassword });
        console.log('✅ Password updated');
      }
    }
    
    // List all users
    const allUsers = await User.findAll();
    console.log(`\n📊 Total users in database: ${allUsers.length}`);
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - Active: ${user.is_active}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkAndFixAdmin();
