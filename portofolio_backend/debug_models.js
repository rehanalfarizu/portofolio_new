// Test script untuk debug models import
// Jalankan: node debug_models.js

console.log('🔍 Debugging models import...\n');

// Test 1: Import database config
try {
  const { sequelize } = require('./config/database');
  console.log('✅ Database config loaded');
  console.log('   - Sequelize instance:', typeof sequelize);
} catch (error) {
  console.error('❌ Database config error:', error.message);
}

// Test 2: Import individual models
console.log('\n🔍 Testing individual model imports:');

try {
  const User = require('./models/user');
  console.log('✅ User model:', typeof User, User.name);
  console.log('   - hasOne function:', typeof User.hasOne);
} catch (error) {
  console.error('❌ User model error:', error.message);
}

try {
  const Biodata = require('./models/biodata');
  console.log('✅ Biodata model:', typeof Biodata, Biodata.name);
} catch (error) {
  console.error('❌ Biodata model error:', error.message);
}

try {
  const Skill = require('./models/skill');
  console.log('✅ Skill model:', typeof Skill, Skill.name);
} catch (error) {
  console.error('❌ Skill model error:', error.message);
}

try {
  const Experience = require('./models/experience');
  console.log('✅ Experience model:', typeof Experience, Experience.name);
} catch (error) {
  console.error('❌ Experience model error:', error.message);
}

try {
  const Project = require('./models/project');
  console.log('✅ Project model:', typeof Project, Project.name);
} catch (error) {
  console.error('❌ Project model error:', error.message);
}

try {
  const Testimonial = require('./models/testimonial');
  console.log('✅ Testimonial model:', typeof Testimonial, Testimonial.name);
} catch (error) {
  console.error('❌ Testimonial model error:', error.message);
}

try {
  const Contact = require('./models/contact');
  console.log('✅ Contact model:', typeof Contact, Contact.name);
} catch (error) {
  console.error('❌ Contact model error:', error.message);
}

try {
  const Stat = require('./models/stat');
  console.log('✅ Stat model:', typeof Stat, Stat.name);
} catch (error) {
  console.error('❌ Stat model error:', error.message);
}

// Test 3: Import models/index.js
console.log('\n🔍 Testing models/index.js import:');

try {
  const modelsIndex = require('./models/index');
  console.log('✅ Models index loaded');
  console.log('   - User from index:', typeof modelsIndex.User, modelsIndex.User ? modelsIndex.User.name : 'undefined');
  console.log('   - User hasOne:', modelsIndex.User ? typeof modelsIndex.User.hasOne : 'N/A');
  console.log('   - setupAssociations:', typeof modelsIndex.setupAssociations);
} catch (error) {
  console.error('❌ Models index error:', error.message);
  console.error('   Stack:', error.stack);
}

console.log('\n✅ Debug completed!');