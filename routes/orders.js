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
 * Get all orders for a given id customer 
 * @method get/orders/customers/:id
 */
router.get('/customers/:id', [auth, role('CUSTOMER', 'VENDOR', 'ADMIN'), inputValidation('get', 'orders')], asyncMiddleware(Orders.getOrdersCustomer));

/**
 * Get all orders for a given id shop 
 * @method get/orders/shops/:id
 */
router.get('/shops/:id', [auth, role('VENDOR', 'CUSTOMER', 'ADMIN')], asyncMiddleware(Orders.getOrdersShop));

/**
 * Create a new order 
 * @method post/orders/shops/:idShop/customers/:idCustomer
 */
router.post('/shops/:idShop/customers/:idCustomer', [auth, role('CUSTOMER', 'VENDOR', 'ADMIN'), inputValidation('post', 'orders')], asyncMiddleware(Orders.postOrder));

module.exports = router;


/**
 * @swagger
 * /api/v1/orders/customers/{id}:
 *   get:
 *     tags:
 *       - Order
 *     description: Get all orders for a given id customer 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: customer id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Return an array of orders
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 *     security:
 *       - JWT: []
 */

/**
 * @swagger
 * /api/v1/orders/shops/{idShop}/customers/{idCustomer}:
 *   post:
 *     tags:
 *       - Order
 *     description: Create a new order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idShop
 *         description: shop id
 *         in: path
 *         required: true
 *       - name: idCustomer
 *         description: customer id
 *         in: path
 *         required: true
 *       - name: Order
 *         description: order object
 *         in: body
 *         required: true
 *         properties:
 *           products:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Return the order
 *       400:
 *         description: Internal error
 *     security:
 *       - JWT: []
 */
