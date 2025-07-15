// === backend/controllers/dashboardController.js ===
const { Stat, Contact, Project, Skill, Experience } = require('../models');
const { Op } = require('sequelize');

// Track visitor statistics
exports.trackVisit = async (req, res) => {
  try {
    const {
      ip,
      userAgent,
      country,
      city,
      device,
      browser,
      os,
      referrer,
      pageVisited,
      sessionId
    } = req.body;

    // Get IP from request if not provided
    const clientIp = ip || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    if (process.env.USE_DATABASE === 'true' && Stat) {
      // Check if this session already visited recently (within 30 minutes)
      const recentVisit = sessionId ? await Stat.findOne({
        where: {
          sessionId,
          visitDate: {
            [Op.gte]: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
          }
        }
      }) : null;

      const isUnique = !recentVisit;

      const visit = await Stat.create({
        ip: clientIp,
        userAgent: userAgent || req.get('User-Agent'),
        country: country || null,
        city: city || null,
        device: device || null,
        browser: browser || null,
        os: os || null,
        referrer: referrer || req.get('Referer'),
        pageVisited: pageVisited || req.get('Referer'),
        sessionId: sessionId || null,
        isUnique
      });

      res.json({
        success: true,
        message: 'Visit tracked successfully',
        data: {
          id: visit.id,
          isUnique
        }
      });
    } else {
      // Mock response when database is disabled
      res.json({
        success: true,
        message: 'Visit tracking disabled (database not connected)',
        data: {
          id: Date.now(),
          isUnique: true
        }
      });
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track visit',
      error: error.message
    });
  }
};

// Get comprehensive dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {};

    if (process.env.USE_DATABASE === 'true') {
      // Visitor statistics
      if (Stat) {
        const totalVisitors = await Stat.count();
        const uniqueVisitors = await Stat.count({ where: { isUnique: true } });
        const todayVisitors = await Stat.count({
          where: {
            visitDate: {
              [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
            }
          }
        });
        const thisMonthVisitors = await Stat.count({
          where: {
            visitDate: {
              [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        });

        // Top countries
        const topCountries = await Stat.findAll({
          attributes: [
            'country',
            [Stat.sequelize.fn('COUNT', Stat.sequelize.col('country')), 'count']
          ],
          where: {
            country: { [Op.not]: null }
          },
          group: ['country'],
          order: [[Stat.sequelize.fn('COUNT', Stat.sequelize.col('country')), 'DESC']],
          limit: 5
        });

        // Device statistics
        const deviceStats = await Stat.findAll({
          attributes: [
            'device',
            [Stat.sequelize.fn('COUNT', Stat.sequelize.col('device')), 'count']
          ],
          where: {
            device: { [Op.not]: null }
          },
          group: ['device'],
          order: [[Stat.sequelize.fn('COUNT', Stat.sequelize.col('device')), 'DESC']]
        });

        stats.visitors = {
          total: totalVisitors,
          unique: uniqueVisitors,
          today: todayVisitors,
          thisMonth: thisMonthVisitors,
          topCountries,
          deviceStats
        };
      }

      // Contact statistics
      if (Contact) {
        const totalContacts = await Contact.count();
        const unreadContacts = await Contact.count({ where: { is_read: false } });
        const recentContacts = await Contact.count({
          where: {
            created_at: {
              [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        });

        stats.contacts = {
          total: totalContacts,
          unread: unreadContacts,
          recent: recentContacts
        };
      }

      // Portfolio content statistics
      if (Project) {
        stats.projects = await Project.count();
      }
      if (Skill) {
        stats.skills = await Skill.count();
      }
      if (Experience) {
        stats.experiences = await Experience.count();
      }
    } else {
      // Mock data when database is disabled
      stats.visitors = {
        total: 1234,
        unique: 890,
        today: 45,
        thisMonth: 567,
        topCountries: [
          { country: 'Indonesia', count: 450 },
          { country: 'United States', count: 234 },
          { country: 'Singapore', count: 123 }
        ],
        deviceStats: [
          { device: 'desktop', count: 678 },
          { device: 'mobile', count: 456 },
          { device: 'tablet', count: 100 }
        ]
      };
      stats.contacts = { total: 15, unread: 3, recent: 7 };
      stats.projects = 12;
      stats.skills = 25;
      stats.experiences = 8;
    }

    res.json({
      success: true,
      data: stats,
      database: process.env.USE_DATABASE === 'true' ? 'enabled' : 'disabled'
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard statistics',
      error: error.message
    });
  }
};

// Get visitor analytics with date range
exports.getVisitorAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    
    if (process.env.USE_DATABASE === 'true' && Stat) {
      const whereClause = {};
      
      if (startDate && endDate) {
        whereClause.visitDate = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      // Group visits by time period
      let dateFormat;
      switch (groupBy) {
        case 'hour':
          dateFormat = 'YYYY-MM-DD HH24:00:00';
          break;
        case 'day':
          dateFormat = 'YYYY-MM-DD';
          break;
        case 'week':
          dateFormat = 'YYYY-WW';
          break;
        case 'month':
          dateFormat = 'YYYY-MM';
          break;
        default:
          dateFormat = 'YYYY-MM-DD';
      }

      const analytics = await Stat.findAll({
        attributes: [
          [Stat.sequelize.fn('to_char', Stat.sequelize.col('visit_date'), dateFormat), 'period'],
          [Stat.sequelize.fn('COUNT', '*'), 'visits'],
          [Stat.sequelize.fn('COUNT', Stat.sequelize.literal('CASE WHEN is_unique = true THEN 1 END')), 'uniqueVisits']
        ],
        where: whereClause,
        group: [Stat.sequelize.fn('to_char', Stat.sequelize.col('visit_date'), dateFormat)],
        order: [[Stat.sequelize.fn('to_char', Stat.sequelize.col('visit_date'), dateFormat), 'ASC']]
      });

      res.json({
        success: true,
        analytics,
        period: { startDate, endDate, groupBy }
      });
    } else {
      // Mock analytics data
      const mockData = [
        { period: '2025-01-14', visits: 45, uniqueVisits: 32 },
        { period: '2025-01-15', visits: 67, uniqueVisits: 48 },
        { period: '2025-01-16', visits: 52, uniqueVisits: 38 }
      ];
      
      res.json({
        success: true,
        analytics: mockData,
        period: { startDate, endDate, groupBy },
        note: 'Mock data - database disabled'
      });
    }
  } catch (error) {
    console.error('Error getting visitor analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get visitor analytics',
      error: error.message
    });
  }
};