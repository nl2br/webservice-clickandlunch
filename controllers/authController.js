/**
 * @module controller/Auth
 */

const Models = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

class Auth {

  /**
   * @function authenticateUser
   * Log the user by generating his token
   * @param {Object} req 
   * @param {Object} res
   * @return {String} token + user informations
   */
  static async authenticateUser(req, res, next) { // login
    let user;
    // verify if user exist
    user = await Models.User.findOne({where:{email: req.body.email}});
    if(!user) {
      const err = new Error('invalid login or password');
      err.status = 401;
      return next(err);
    }

    // compare both password
    const valid = await bcrypt.compare(req.body.password,user.password);
    if(!valid) {
      const err = new Error('invalid login or password');
      err.status = 401;
      return next(err);
    }
    
    // generate the token
    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Authentication successful!',
      user: {id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname},
      token: token
    });
  }

  /**
   * @function authenticateMe
   * Verify token user
   * @param {*} req 
   * @param {*} res 
   */
  static async authenticateMe(req, res, next) {
    const token = req.headers['x-auth-token'] ;
    if (!token) {
      const err = new Error('x-auth-token header not found');
      err.status = 403;
      return next(err);
    }
    
    jwt.verify(token, config.jwtPrivateKey, (error, result) => {
      if (error) {
        const err = new Error('Provided token is invalid');
        err.status = 403;
        return next(err);
      }
      return res.json({
        type: 'success',
        message: 'Provided token is valid.',
        result
      });
    });
  }


}

module.exports = Auth;