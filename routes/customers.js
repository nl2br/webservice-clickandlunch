const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


// Listing Customer details for a given Customer 
// GET /customers/:id (all)
router.get('/:id', customerController.getCustomer);

// Listing all orders for a given Customer 
// GET /customers/:id/orders (all)
// router.get('/:id/orders', customerController.getAllCustomerOrders);

// Listing specific order for a given Customer
// GET /customers/:customerid/orders/:orderid (all)
// router.get('/:customerid/orders/:orderid', customerController.getCustomerSpecificOrder);

// Create a new customer
// POST /customers (admin, pro user)
router.post('/', customerController.postCustomer);

// Modify details for a given customer
// PUT /customers/:id (admin, pro user)
router.put('/:id', customerController.putCustomer);

// Delete a customer
// DELETE /customers/:id (admin, pro user)

module.exports = router;