// === backend/controllers/testimonialController.js ===
const { Testimonial } = require('../models');

exports.getTestimonials = async (req, res) => {
  const data = await Testimonial.findAll();
  res.json(data);
};

exports.addTestimonial = async (req, res) => {
  const newData = await Testimonial.create(req.body);
  res.json(newData);
};

exports.deleteTestimonial = async (req, res) => {
  await Testimonial.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};