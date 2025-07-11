const jwt = require('jsonwebtoken');

const SECRET = 'secret_key'; // Idealnya simpan di .env

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
