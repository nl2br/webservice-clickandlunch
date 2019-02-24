/**
 * @module controller/User
 */

const Models = require('../models/');

class Users {

  /**
   * @function postUser
   * Create a new User
   * @param {*} req 
   * @param {*} res 
   */
  static async postUser(req, res) {

    // verify if user already exist
    const user = await Models.User.findOne({where:{email: req.body.email}});
    if(user) return res.status(400).send({message: 'User already exist'});

    // create the user
    Models.User.create({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      phoneNumber:req.body.phoneNumber,
      email:req.body.email,
      password:req.body.password
    })
      .then(result => {
        res.status(201).json({
          userId: result.userId,
          firstname: result.firstname,
          lastname: result.lastname,
          phoneNumber: result.phoneNumber,
          email: result.email,
        });
      })
      .catch(error => {
        console.log('error postUser : ', error.message);
        res.status(400).send({message: error.message});
      });
  }

}

module.exports = Users;