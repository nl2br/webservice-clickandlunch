/**
 * Authorization middleware
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = function (req, res, next) {

  const token = req.header('x-auth-token') || req.header('x-access-token') || req.header('authorization');
  console.log('TCL: req.header(\'authorization\')', req.header('authorization'));
  console.log('TCL: req.header(\'x-access-token\')', req.header('x-access-token'));
  console.log('TCL: req.header(\'x-auth-token\')', req.header('x-auth-token'));
  console.log('TCL: token', token);
  if(!token) return res.status(401).send('Access denied. No token provided');

  try {
    const payload = jwt.verify(token, config.jwtPrivateKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
  
};