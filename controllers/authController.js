/**
 * @module controller/Auth
 */

const Models = require('../models/');
const bcrypt = require('bcrypt');

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
      if(!user) return res.status(400).send({message: 'invalid login or password'});
    }catch(ex){
      res.status(500).send('Internal error');
    }

    // compare both password
    try{
      const valid = await bcrypt.compare(req.body.password,user.password);
      if(!valid) return res.status(400).send({message: 'invalid login or password'});
    }catch(ex){
      res.status(500).send('Internal error');
    }
    
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