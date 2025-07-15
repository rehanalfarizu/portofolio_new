// === backend/controllers/contactController.js ===
require('dotenv').config();
const { Op } = require('sequelize');

// Mock data storage untuk fallback jika database tidak tersedia
let contactMessages = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message',
    created_at: new Date(),
    updated_at: new Date()
  }
];

let messageIdCounter = 2;

// Database model import
let Contact;
try {
  if (process.env.USE_DATABASE === 'true') {
    const models = require('../models');
    Contact = models.Contact;
    console.log('✅ Contact model loaded successfully');
  }
} catch (error) {
  console.log('⚠️ Database models not available, using mock data:', error.message);
}

exports.getMessages = async (req, res) => {
  try {
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const data = await Contact.findAll();
      res.json({
        success: true,
        data: data,
        source: 'database'
      });
    } else {
      res.json({
        success: true,
        data: contactMessages,
        source: 'mock_data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get messages',
      error: error.message
    });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validasi input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Semua field harus diisi'
      });
    }

    if (process.env.USE_DATABASE === 'true' && Contact) {
      const newMsg = await Contact.create(req.body);
      res.json({
        success: true,
        message: 'Pesan berhasil dikirim!',
        data: newMsg,
        source: 'database'
      });
    } else {
      // Use mock data
      const newMsg = {
        id: messageIdCounter++,
        name,
        email,
        message,
        created_at: new Date(),
        updated_at: new Date()
      };
      contactMessages.push(newMsg);
      
      res.json({
        success: true,
        message: 'Pesan berhasil dikirim!',
        data: newMsg,
        source: 'mock_data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengirim pesan',
      error: error.message
    });
  }
};

// Test endpoint
exports.testConnection = async (req, res) => {
  res.json({
    success: true,
    message: 'Backend connection successful! 🎉',
    timestamp: new Date().toISOString(),
    database: process.env.USE_DATABASE === 'true' ? 'enabled' : 'disabled'
  });
};

// Stats endpoint
exports.getStats = async (req, res) => {
  try {
    let messageCount = 0;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      messageCount = await Contact.count();
    } else {
      messageCount = contactMessages.length;
    }

    res.json({
      success: true,
      stats: {
        totalMessages: messageCount,
        database: process.env.USE_DATABASE === 'true' ? 'enabled' : 'disabled'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: error.message
    });
  }
};

// Get all contacts with pagination and filters
exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const offset = (page - 1) * limit;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const whereClause = {};
      
      // Search filter
      if (search) {
        whereClause[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { subject: { [Op.iLike]: `%${search}%` } },
          { message: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      // Status filter
      if (status === 'read') whereClause.is_read = true;
      if (status === 'unread') whereClause.is_read = false;
      if (status === 'replied') whereClause.is_replied = true;
      if (status === 'unreplied') whereClause.is_replied = false;
      
      const { count, rows } = await Contact.findAndCountAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: offset
      });
      
      res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });
    } else {
      // Mock data fallback
      let filteredData = contactMessages;
      
      if (search) {
        filteredData = contactMessages.filter(msg => 
          msg.name.toLowerCase().includes(search.toLowerCase()) ||
          msg.email.toLowerCase().includes(search.toLowerCase()) ||
          msg.subject.toLowerCase().includes(search.toLowerCase()) ||
          msg.message.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      const total = filteredData.length;
      const paginatedData = filteredData.slice(offset, offset + parseInt(limit));
      
      res.json({
        success: true,
        data: paginatedData,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        }
      });
    }
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contacts',
      error: error.message
    });
  }
};

// Mark contact as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      contact.is_read = true;
      await contact.save();
      
      res.json({
        success: true,
        message: 'Contact marked as read',
        data: contact
      });
    } else {
      const contact = contactMessages.find(msg => msg.id === parseInt(id));
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      contact.is_read = true;
      res.json({
        success: true,
        message: 'Contact marked as read',
        data: contact
      });
    }
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark contact as read',
      error: error.message
    });
  }
};

// Mark contact as replied
exports.markAsReplied = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      contact.is_replied = true;
      contact.is_read = true; // Auto mark as read when replied
      await contact.save();
      
      res.json({
        success: true,
        message: 'Contact marked as replied',
        data: contact
      });
    } else {
      const contact = contactMessages.find(msg => msg.id === parseInt(id));
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      contact.is_replied = true;
      contact.is_read = true;
      res.json({
        success: true,
        message: 'Contact marked as replied',
        data: contact
      });
    }
  } catch (error) {
    console.error('Error marking contact as replied:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark contact as replied',
      error: error.message
    });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      await contact.destroy();
      
      res.json({
        success: true,
        message: 'Contact deleted successfully'
      });
    } else {
      const index = contactMessages.findIndex(msg => msg.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      contactMessages.splice(index, 1);
      res.json({
        success: true,
        message: 'Contact deleted successfully'
      });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};

// Get detailed contact statistics
exports.getDetailedStats = async (req, res) => {
  try {
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const totalMessages = await Contact.count();
      const unreadMessages = await Contact.count({ where: { is_read: false } });
      const repliedMessages = await Contact.count({ where: { is_replied: true } });
      const recentMessages = await Contact.count({
        where: {
          created_at: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      });
      
      res.json({
        success: true,
        stats: {
          totalMessages,
          unreadMessages,
          repliedMessages,
          recentMessages,
          database: 'enabled'
        }
      });
    } else {
      const totalMessages = contactMessages.length;
      const unreadMessages = contactMessages.filter(msg => !msg.is_read).length;
      const repliedMessages = contactMessages.filter(msg => msg.is_replied).length;
      const recentMessages = contactMessages.filter(msg => {
        const msgDate = new Date(msg.created_at);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return msgDate >= weekAgo;
      }).length;
      
      res.json({
        success: true,
        stats: {
          totalMessages,
          unreadMessages,
          repliedMessages,
          recentMessages,
          database: 'disabled'
        }
      });
    }
  } catch (error) {
    console.error('Error getting detailed stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get detailed stats',
      error: error.message
    });
  }
};

// Get individual message by ID
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (process.env.USE_DATABASE === 'true' && Contact) {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      res.json({
        success: true,
        data: contact
      });
    } else {
      const contact = contactMessages.find(msg => msg.id === parseInt(id));
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      res.json({
        success: true,
        data: contact
      });
    }
  } catch (error) {
    console.error('Error getting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contact',
      error: error.message
    });
  }
};
