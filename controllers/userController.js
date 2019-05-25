/**
 * @module controller/User
 */

const Models = require('../models/');
const bcrypt = require('bcrypt');

class Users {

  /**
   * @function postUser
   * Create a new User and send the Token for authentication
   * @param {Object} req 
   * @param {Object} res
   * @return {String} the response without password + token in the hearder x-auth-token
   */
  static async postUser(req, res) {
    
    // verify if user already exist
    let user = await Models.User.findOne({where:{email: req.body.email}});
    if(user) return res.status(400).send({message: 'User already exist'});

    // generate the salt
    const salt = await bcrypt.genSalt(10);
    // generate the hashed password with the salt
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try{
      // create the user
      user = await Models.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role
      });

      // generate the token
      let token = user.generateAuthToken();

      // add the type
      switch (user.role) {
      case 'CUSTOMER':
        await Models.Customer.create({
          id: user.id
        })
          .catch(err => {
            throw err;
          });
        break;
      case 'VENDOR':
        await Models.Vendor.create({
          id: user.id
        })
          .catch(err => {
            throw err;
          });
        break;
      }

      // send the response without password
      return res
        .header('x-auth-token', token)
        .status(201)
        .json({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: req.body.role
        });
    } catch (ex) {
      return res.status(400).send({message : ex.message});
    }
  }

}

module.exports = Users;