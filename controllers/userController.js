/**
 * @module controller/User
 */

const Models = require('../models/');
const bcrypt = require('bcrypt');

class Users {

  /**
   * @function postUser
   * Create a new User
   * @param {*} req 
   * @param {*} res 
   */
  static postUser(req, res) {

    // verify if user already exist
    return Models.User.findOne({where:{email: req.body.email}})
      .then(user => {
        if(user) return res.status(400).send({message: 'User already exist'});
        // generate the salt
        return bcrypt.genSalt(10);
      })
      .then(salt => {
        // generate the hashed password with the salt
        return bcrypt.hash(req.body.password, salt);
      })
      .then(hashPassword => {
        // TODO: put the type of the user: customer or supplier ???
        // create the user
        return Models.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hashPassword
        });
      })
      .then(user => {
        // generate the token
        const token = user.generateAuthToken();
        // send the response without password
        res
          .header('x-auth-token', token)
          .status(201)
          .json({
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber,
            email: user.email,
          });
      })
      .catch(error => {
        console.log('error postUser : ', error.message);
        res.status(400).send({message: error.message});
      });
  }



}

module.exports = Users;