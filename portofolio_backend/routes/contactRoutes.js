const express = require('express');
const { Contact } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

// Middleware untuk mendapatkan IP address
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
};

// GET - Test endpoint
router.get('/test', async (req, res) => {
  try {
    const count = await Contact.count();
    res.json({
      success: true,
      message: 'Contact API is working!',
      data: {
        totalContacts: count,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// POST - Create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validasi input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        fields: ['name', 'email', 'subject', 'message']
      });
    }

    // Cek apakah email sudah mengirim dalam 1 jam terakhir (spam prevention)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentContact = await Contact.findOne({
      where: {
        email: email,
        created_at: {
          [Op.gte]: oneHourAgo
        }
      }
    });

    if (recentContact) {
      return res.status(429).json({
        success: false,
        message: 'You can only send one message per hour. Please try again later.',
        nextAllowed: new Date(recentContact.created_at.getTime() + 60 * 60 * 1000)
      });
    }

    // Create contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ip_address: getClientIp(req),
      user_agent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        created_at: contact.created_at
      }
    });

  } catch (error) {
    console.error('Contact creation error:', error);
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET - Get all contacts (untuk admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filter } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    // Search functionality
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { subject: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    // Filter functionality
    if (filter === 'unread') {
      whereClause.is_read = false;
    } else if (filter === 'read') {
      whereClause.is_read = true;
    }

    const { count, rows } = await Contact.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: { exclude: ['user_agent'] } // Hide user agent from response
    });

    res.json({
      success: true,
      data: {
        contacts: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read, is_replied } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    const updateData = {};
    if (typeof is_read === 'boolean') updateData.is_read = is_read;
    if (typeof is_replied === 'boolean') updateData.is_replied = is_replied;

    await contact.update(updateData);

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
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

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const [total, unread, replied, today] = await Promise.all([
      Contact.count(),
      Contact.count({ where: { is_read: false } }),
      Contact.count({ where: { is_replied: true } }),
      Contact.count({ 
        where: {
          created_at: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        total,
        unread,
        replied,
        today,
        readRate: total > 0 ? ((total - unread) / total * 100).toFixed(1) : 0,
        replyRate: total > 0 ? (replied / total * 100).toFixed(1) : 0
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
