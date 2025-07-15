const { User } = require('./models');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    // Delete existing admin if exists
    await User.destroy({ where: { email: 'admin@portfolio.com' } });
    
    // Create admin user with consistent salt rounds
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
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
    
    // Test password verification
    const isValid = await bcrypt.compare('admin123', admin.password);
    console.log('✅ Password verification test:', isValid);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    process.exit();
  }
}

createAdmin();
