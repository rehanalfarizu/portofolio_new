// === backend/controllers/skillController.js ===
const { Skill } = require('../models');

exports.getSkills = async (req, res) => {
  const skills = await Skill.findAll();
  res.json(skills);
};

exports.addSkill = async (req, res) => {
  const newSkill = await Skill.create(req.body);
  res.json(newSkill);
};

exports.deleteSkill = async (req, res) => {
  await Skill.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
