/**
 * @module controller/Customer
 */

const Models = require('../models/');

class Customers {

  /**
   * @function getCustomer
   * Get a User of type customer
   * @param {*} req 
   * @param {*} res 
   */
  static async getCustomer(req, res, next) {
    Models.Customer.findOne({where:{id: req.params.id}})
      .then(async customer => {
        if(!customer) return res.status(400).send({message: 'No customer for the given id'});
        let user = await customer.getUser();
        res.status(200).json({
          id: user.dataValues.id,
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
   * @function putCustomer
   * Modify a user
   * @param {*} req 
   * @param {*} res 
   */
  static async putCustomer(req, res, next) {
    
    // verify if user exist
    let customer = await Models.Customer.findOne({where:{id: req.params.id}});
    if(!customer) return res.status(400).send({message: 'User doesn\'t exist'});

    let user = await customer.getUser();
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

module.exports = Customers;

// validation input
// const Joi = require('joi');

// // Listing all Customer 
// // GET /Customers (all)
// exports.getAllCustomers = (req, res, next) => {
//   Models.Customer.findAll()
//     .then(allCustomers => {
//       return res.status(200).json(allCustomers);
//     })
//     .catch(error => {
//       console.log('error getAllCustomers', error.message);
//       return res.status(400).send(error);
//     })
// };


// Listing all Orders for a given Customer 
// GET /customers/:id/orders (all)
// exports.getAllCustomerOrders = (req, res, next) => {
//   Models.Order.findAll({
//     where: {
//       customer_id: req.params.id
//     }
//   })
//     .then(customerOrders => {
//       if (Array.isArray(customerOrders) && !customerOrders.length) {
//         return res.status(404).send({message: 'No Orders Found for the given customer id'});
//       }
//       return res.status(200).json(customerOrders);
//     })
//     .catch(error => {
//       console.log('error getAllCustomerOrders : ', error.message);
//       return res.status(400).send(error);
//     });
// };

// Listing specific Order for a given Customer
// GET /customers/:customerid/orders/:orderid (all)
// exports.getCustomerSpecificOrder = (req, res, next) => {
//   Models.Orders.findOne({
//     where: { order_id: req.params.orderid, customer_id: req.params.customerid },
//   })
//     .then(specificOrder => {
//       if (!specificOrder) {
//         return res.status(404).send({message: 'Order or Customer Not Found'});
//       }
//       return res.status(200).json(specificOrder);
//     })
//     .catch(error => {
//       console.log('error getCustomerSpecificOrder : ', error.message);
//       return res.status(400).send(error);
//     });
// };


// Delete a Customer
// DELETE /Customers/:id (admin, pro user)