const { sequelize } = require('./models');
const { User, Project, Skill, Experience, Biodata, Contact } = require('./models');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Sync all models (create tables)
    await sequelize.sync({ force: true }); // force: true akan drop dan recreate tables
    console.log('✅ Database tables created');
    
    // Create admin user
    console.log('🔄 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password: hashedPassword,
      role: 'admin',
      is_active: true
    });
    console.log('✅ Admin user created');
    
    // Create sample projects
    console.log('🔄 Creating sample projects...');
    await Project.bulkCreate([
      {
        title: 'E-Commerce Website',
        description: 'Full-stack e-commerce platform with React and Node.js',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/user/project',
        technologies: JSON.stringify(['React', 'Node.js', 'MongoDB']),
        status: 'active'
      },
      {
        title: 'Task Management App',
        description: 'Modern task management application with drag-and-drop functionality',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
        demoUrl: 'https://tasks.example.com',
        githubUrl: 'https://github.com/user/tasks',
        technologies: JSON.stringify(['Vue.js', 'Express', 'PostgreSQL']),
        status: 'active'
      }
    ]);
    console.log('✅ Sample projects created');
    
    // Create sample skills
    console.log('🔄 Creating sample skills...');
    await Skill.bulkCreate([
      {
        name: 'JavaScript',
        level: 'Advanced'
      },
      {
        name: 'React',
        level: 'Advanced'
      },
      {
        name: 'Node.js',
        level: 'Intermediate'
      }
    ]);
    console.log('✅ Sample skills created');
    
    // Create sample experiences
    console.log('🔄 Creating sample experiences...');
    await Experience.bulkCreate([
      {
        position: 'Full Stack Developer',
        company: 'Tech Company',
        location: 'Jakarta, Indonesia',
        startDate: new Date('2022-01-01'),
        endDate: null,
        isCurrentJob: true,
        description: 'Developing web applications using modern technologies'
      },
      {
        position: 'Frontend Developer',
        company: 'Startup Inc',
        location: 'Remote',
        startDate: new Date('2021-06-01'),
        endDate: new Date('2021-12-31'),
        isCurrentJob: false,
        description: 'Built responsive web interfaces and improved user experience'
      }
    ]);
    console.log('✅ Sample experiences created');
    
    // Create biodata
    console.log('🔄 Creating biodata...');
    await Biodata.create({
      user_id: adminUser.id,
      title: 'Raihan Alfarizi',
      subtitle: 'Full Stack Developer',
      description: 'Passionate developer with expertise in modern web technologies. I love creating innovative solutions and learning new technologies.',
      email: 'raihan@example.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta, Indonesia',
      website: 'https://raihan.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    });
    console.log('✅ Biodata created');
    
    // Create sample contacts
    console.log('🔄 Creating sample contacts...');
    await Contact.bulkCreate([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        subject: 'Project Inquiry',
        message: 'Hello! I am interested in your portfolio and would like to discuss potential collaboration opportunities.',
        is_read: false
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        subject: 'Freelance Work',
        message: 'Hi there! I have a project that might be perfect for your skills. Could we schedule a call?',
        is_read: true
      }
    ]);
    console.log('✅ Sample contacts created');
    
    console.log('🎉 Database initialization completed successfully!');
    console.log('📋 Summary:');
    console.log(`   - Admin user: admin@portfolio.com / admin123`);
    console.log(`   - Projects: 2 sample projects`);
    console.log(`   - Skills: 3 sample skills`);
    console.log(`   - Experiences: 2 sample experiences`);
    console.log(`   - Biodata: 1 profile`);
    console.log(`   - Contacts: 2 sample messages`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Initialization complete');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
