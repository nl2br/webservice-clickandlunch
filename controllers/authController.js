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
   * @param {*} req 
   * @param {*} res 
   */
  static async authenticateUser(req, res) { // login
    let user;
    // verify if user exist
    try{
      user = await Models.User.findOne({where:{email: req.body.email}});
      if(!user) return res.status(401).json({type: 'error', message: 'invalid login or password'});
    }catch(ex){
      res.status(500).send('Internal error');
    }

    // compare both password
    try{
      const valid = await bcrypt.compare(req.body.password,user.password);
      if(!valid) return res.status(401).send({type: 'error', message: 'invalid login or password'});
    }catch(ex){
      res.status(500).send('Internal error');
    }
    
    // generate the token
    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Authentication successful!',
      user: {id: user.id, email: user.email},
      token: token
    });
  }

  /**
   * @function authenticateMe
   * Verify token user
   * @param {*} req 
   * @param {*} res 
   */
  static async authenticateMe(req, res) {
    const token = req.headers['x-auth-token'] ;
    console.log('TCL: Auth -> staticauthenticateMe -> token', token);
    if (!token) return res.status(403).json({type: 'error', message: 'x-auth-token header not found.'});
    
    jwt.verify(token, config.jwtPrivateKey, (error, result) => {
      if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error});
      return res.json({
        type: 'success',
        message: 'Provided token is valid.',
        result
      });
    });
  }


}

module.exports = Auth;