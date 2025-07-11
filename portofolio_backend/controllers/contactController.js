// === backend/controllers/contactController.js ===
const { Contact } = require('../models');

exports.getMessages = async (req, res) => {
  const data = await Contact.findAll();
  res.json(data);
};

exports.addMessage = async (req, res) => {
  const newMsg = await Contact.create(req.body);
  res.json(newMsg);
};
