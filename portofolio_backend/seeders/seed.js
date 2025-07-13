const {
  sequelize,
  User,
  Biodata,
  Contact,
  Experience,
  Project,
  Skill,
  Stat,
  Testimonial
} = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // WARNING: This will drop all tables!

    console.log('🚀 Database synced. Seeding data...');

    // Seed User
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword' // Assume hashed
    });

    // Seed Biodata
    await Biodata.create({
      user_id: user.id,
      title: 'Full Stack Developer',
      description: 'Experienced developer in MERN stack.'
    });

    // Seed Contact
    await Contact.create({
      user_id: user.id,
      type: 'email',
      value: 'john@example.com'
    });

    // Seed Experience
    await Experience.create({
      user_id: user.id,
      company: 'Tech Company',
      position: 'Backend Developer',
      start_date: '2020-01-01',
      end_date: '2022-01-01',
      description: 'Worked on backend APIs.'
    });

    // Seed Project
    await Project.create({
      user_id: user.id,
      title: 'Portfolio Website',
      description: 'A personal portfolio website.',
      link: 'https://portfolio.john.com'
    });

    // Seed Skill
    await Skill.create({
      user_id: user.id,
      name: 'JavaScript',
      level: 'Expert'
    });

    // Seed Stat
    await Stat.create({
      user_id: user.id,
      key: 'projects_done',
      value: 12
    });

    // Seed Testimonial
    await Testimonial.create({
      user_id: user.id,
      author: 'Client A',
      message: 'Great to work with!'
    });

    console.log('✅ Seeding completed successfully.');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
