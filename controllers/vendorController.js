/**
 * @module controller/Vendor
 */

const Models = require('../models/');

class Vendors {

  /**
   * @function getVendor
   * Get a User of type vendor
   * @param {*} req 
   * @param {*} res 
   */
  static async getVendor(req, res) {
    Models.Vendor.findOne({where:{vendorId: req.params.id}})
      .then(async vendor => {
        if(!vendor) return res.status(400).send({message: 'No vendor for the given id'});
        let user = await vendor.getUser();
        res.status(200).json({
          userId: user.dataValues.userId,
          firstname: user.dataValues.firstname,
          lastname: user.dataValues.lastname,
          phoneNumber: user.dataValues.phoneNumber,
          email: user.dataValues.email,
          role: req.body.role
        });
      })
      .catch(error => {
        res.status(500).send({message: error.message});
      });
  }

  /**
   * @function putVendor
   * Modify a user
   * @param {*} req 
   * @param {*} res 
   */
  static async putVendor(req, res) {
    
    // verify if user exist
    let vendor = await Models.Vendor.findOne({where:{vendorId: req.params.id}});
    if(!vendor) return res.status(400).send({message: 'User doesn\'t exist'});

    let user = await vendor.getUser();
    try{
      // create the user
      await user.update({
        firstname: req.body.firstname || user.dataValues.firstname,
        lastname: req.body.lastname || user.dataValues.lastname,
        phoneNumber: req.body.phoneNumber || user.dataValues.phoneNumber
      })
        .catch(err => {
          throw err;
        });

      // send the response without password
      return res
        .status(200)
        .json({
          userId: user.userId,
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

module.exports = Vendors;