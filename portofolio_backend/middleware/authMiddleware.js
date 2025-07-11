const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const user = verifyToken(token);
  if (!user) return res.status(403).json({ error: 'Invalid token' });

  req.user = user;
  next();
};
