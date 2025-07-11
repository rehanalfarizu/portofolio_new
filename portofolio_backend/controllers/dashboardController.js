// === backend/controllers/dashboardController.js ===
const { Stat } = require('../models');

exports.getStats = async (req, res) => {
  const stats = await Stat.findAll();
  res.json(stats);
};