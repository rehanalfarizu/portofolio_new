// Mock data untuk development tanpa database
const mockData = {
  users: [
    {
      id: 1,
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password: '$2b$10$1234567890abcdefghijk', // hash untuk 'admin123'
      role: 'admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  
  projects: [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'Full-stack e-commerce platform with React and Node.js',
      image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      demo_url: 'https://demo.example.com',
      github_url: 'https://github.com/user/project',
      technologies: ['React', 'Node.js', 'MongoDB'],
      featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Modern task management application with drag-and-drop functionality',
      image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
      demo_url: 'https://tasks.example.com',
      github_url: 'https://github.com/user/tasks',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      featured: false,
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  
  skills: [
    {
      id: 1,
      name: 'JavaScript',
      level: 'Advanced',
      category: 'Programming',
      icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'React',
      level: 'Advanced',
      category: 'Framework',
      icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Node.js',
      level: 'Intermediate',
      category: 'Backend',
      icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  
  experiences: [
    {
      id: 1,
      position: 'Full Stack Developer',
      company: 'Tech Company',
      location: 'Jakarta, Indonesia',
      start_date: '2022-01-01',
      end_date: null,
      is_current: true,
      description: 'Developing web applications using modern technologies',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      position: 'Frontend Developer',
      company: 'Startup Inc',
      location: 'Remote',
      start_date: '2021-06-01',
      end_date: '2021-12-31',
      is_current: false,
      description: 'Built responsive web interfaces and improved user experience',
      technologies: ['Vue.js', 'TypeScript', 'Sass'],
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  
  biodata: [
    {
      id: 1,
      user_id: 1,
      title: 'Raihan Alfarizi',
      subtitle: 'Full Stack Developer',
      description: 'Passionate developer with expertise in modern web technologies. I love creating innovative solutions and learning new technologies.',
      email: 'raihan@example.com',
      phone: '+62 812-3456-7890',
      location: 'Jakarta, Indonesia',
      website: 'https://raihan.dev',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  
  contacts: [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'Project Inquiry',
      message: 'Hello! I am interested in your portfolio and would like to discuss potential collaboration opportunities.',
      is_read: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      subject: 'Freelance Work',
      message: 'Hi there! I have a project that might be perfect for your skills. Could we schedule a call?',
      is_read: true,
      created_at: new Date(Date.now() - 86400000), // 1 day ago
      updated_at: new Date(Date.now() - 86400000)
    }
  ],
  
  testimonials: [
    {
      id: 1,
      client_name: 'Sarah Wilson',
      client_position: 'Project Manager',
      client_company: 'Digital Agency',
      content: 'Raihan delivered exceptional work on our project. His attention to detail and technical expertise made all the difference.',
      rating: 5,
      client_image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c',
      featured: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
};

// Helper functions untuk mock operations
let nextId = {
  users: 2,
  projects: 3,
  skills: 4,
  experiences: 3,
  biodata: 2,
  contacts: 3,
  testimonials: 2
};

const mockOperations = {
  // Get all items
  getAll: (table) => {
    return mockData[table] || [];
  },
  
  // Get by ID
  getById: (table, id) => {
    return mockData[table]?.find(item => item.id === parseInt(id));
  },
  
  // Create new item
  create: (table, data) => {
    const newItem = {
      id: nextId[table]++,
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    if (!mockData[table]) {
      mockData[table] = [];
    }
    
    mockData[table].push(newItem);
    return newItem;
  },
  
  // Update item
  update: (table, id, data) => {
    const index = mockData[table]?.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      mockData[table][index] = {
        ...mockData[table][index],
        ...data,
        updated_at: new Date()
      };
      return mockData[table][index];
    }
    return null;
  },
  
  // Delete item
  delete: (table, id) => {
    const index = mockData[table]?.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      const deleted = mockData[table].splice(index, 1)[0];
      return deleted;
    }
    return null;
  },
  
  // Search items
  search: (table, query) => {
    if (!query) return mockData[table] || [];
    
    return mockData[table]?.filter(item => {
      return Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(query.toLowerCase())
      );
    }) || [];
  }
};

module.exports = { mockData, mockOperations };
