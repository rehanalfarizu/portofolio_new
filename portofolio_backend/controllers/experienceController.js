// === backend/controllers/experienceController.js ===
const { Experience } = require('../models');

exports.getExperience = async (req, res) => {
  const exp = await Experience.findAll();
  res.json(exp);
};

exports.addExperience = async (req, res) => {
  const newExp = await Experience.create(req.body);
  res.json(newExp);
};

exports.deleteExperience = async (req, res) => {
  await Experience.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};