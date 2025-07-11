const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('❌ Error get users:', error);
    res.status(500).json({ error: 'Gagal ambil user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.json(newUser);
  } catch (error) {
    console.error('❌ Error saat menambah user:', error);
    res.status(500).json({ error: 'Gagal tambah user' });
  }
};
