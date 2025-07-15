const { User } = require('./models');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    // Delete existing admin
    await User.destroy({ where: { email: 'admin@portfolio.com' } });
    console.log('🗑️ Deleted existing admin user');
    
    // Hash password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔐 Generated hash for password:', password);
    
    // Create admin user
    const admin = await User.create({
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin',
      is_active: true
    });

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@portfolio.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:', admin.id);
    
    // Immediate verification test
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('✅ Direct hash verification:', isValid);
    
    // Database verification test
    const userFromDb = await User.findByPk(admin.id);
    const isDbValid = await bcrypt.compare(password, userFromDb.password);
    console.log('✅ Database verification:', isDbValid);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

createAdmin();
