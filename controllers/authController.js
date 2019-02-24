/**
 * @module controller/Auth
 */

const Models = require('../models/');
const bcrypt = require('bcrypt');

class Auth {

  /**
   * @function authenticateUser
   * Create a new Auth
   * @param {*} req 
   * @param {*} res 
   */
  static async authenticateUser(req, res) { // login

    // verify if user exist
    const user = await Models.User.findOne({where:{email: req.body.email}});
    if(!user) return res.status(400).send({message: 'invalid login or password'});
    
    // compare both password
    const valid = await bcrypt.compare(req.body.password,user.password);
    if(!valid) return res.status(400).send({message: 'invalid login or password'});
    
    // generate the token
    const token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Authentication successful!',
      token: token
    });
  }

}

module.exports = Auth;