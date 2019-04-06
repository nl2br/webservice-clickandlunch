/**
 * Routes des orders
 * @module routes/orders
 * @requires controllers/orderController
 */
const express = require('express');
const router = express.Router();
const Orders = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const asyncMiddleware = require('../middleware/async');
const inputValidation = require('../middleware/inputValidation');

/**
 * Get details for a given id order (all user)
 * @method get/orders/customers/:id
 */
router.get('/customers/:id', [auth, role('CUSTOMER', 'ADMIN')], asyncMiddleware(Orders.getOrdersCustomer));

/**
 * Get details for a given id order (all user)
 * @method get/orders/shops/:id
 */
router.get('/shops/:id', [auth, role('VENDOR', 'ADMIN')], asyncMiddleware(Orders.getOrdersShop));

/**
 * Create a new order (admin, pro user)
 * @method post/orders/shops/:idShop/customers/:idCustomer
 */
router.post('/shops/:idShop/customers/:idCustomer', [auth, role('CUSTOMER', 'ADMIN')], asyncMiddleware(Orders.postOrder));

module.exports = router;