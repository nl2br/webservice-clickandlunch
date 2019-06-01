/**
 * Authentication middleware
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = function (req, res, next) {

  const token = req.header('x-auth-token') || req.header('x-access-token') || req.header('authorization');

  if(!token) return res.status(401).send('Access denied. No token provided');

  try {
    const payload = jwt.verify(token, config.jwtPrivateKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
  
};

