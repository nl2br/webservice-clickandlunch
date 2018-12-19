const Models = require('../models/');

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

// Listing Customer details for a given Customer id
// GET /customers/:id (all)
exports.getCustomer = (req, res, next) => {
  Models.Customer.findByPk(req.params.id)
    .then(customerDetails => {
      if (!customerDetails) {
        return res.status(404).send({message: 'No Customer Found for the given id'});
      }
      return res.status(200).json(customerDetails);
    })
    .catch(error => {
      console.log('error getCustomer : ', error.message);
      return res.status(400).send(error);
    });
};

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

// Create a new Customer
// POST /Customers (admin, pro user)
exports.postAddCustomer = (req, res, next) => {
  Models.Customer.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname
  })
  .then(newCustomer => {
    return res.status(200).json(newCustomer);
  })
  .catch(error => {
    console.log('error postAddCustomer : ', error.message);
    return res.status(400).send(error);
  })
};

// Modify details for a given Customer
// PUT /Customers/:id (admin, pro user)
exports.putModifyCustomer = (req, res, next) => {
  
  Models.Customer.findById(req.params.id)
  .then(customer => {
    if(!customer) {return res.status(400).send("Customer don't exist");}
    return customer.update({
      first_name: req.body.firstname,
      last_name: req.body.lastname
    },{
      where: {customer_id: req.params.id},
      returning: true,
      plain: true
    });
  })
  .then(updatedCustomer => {
    return res.status(200).json(updatedCustomer);
  })
  .catch(error => {
    console.log('error putModifyCustomer : ', error.message);
    return res.status(400).send(error);
  })

};
// Delete a Customer
// DELETE /Customers/:id (admin, pro user)