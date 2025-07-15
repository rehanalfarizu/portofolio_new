const { User } = require('./models');

async function createAdmin() {
  try {
    // Delete existing admin
    await User.destroy({ where: { email: 'admin@portfolio.com' } });
    console.log('🗑️ Deleted existing admin user');
    
    // Create admin user - let model hooks handle password hashing
    const admin = await User.create({
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password: 'admin123', // Plain password - model will hash it
      role: 'admin',
      is_active: true
    });

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@portfolio.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:', admin.id);
    
    // Test login using model's validatePassword method
    const userFromDb = await User.findByPk(admin.id);
    const isValid = await userFromDb.validatePassword('admin123');
    console.log('✅ Password validation test:', isValid);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

createAdmin();
