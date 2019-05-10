/**
 * Customer Routes
 * @module routes/customers
 * @requires controllers/userController
 */
const express = require('express');
const router = express.Router();
const Customers = require('../controllers/customerController');
const Users = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const asyncMiddleware = require('../middleware/async');
const inputValidation = require('../middleware/inputValidation');

/**
 * Get user details for a given customer 
 * @method get/customers/:id
 * @param {number} id id du customer
 */
router.get('/:id', [auth, role('CUSTOMER', 'VENDOR', 'ADMIN'), inputValidation('get', 'customers')], asyncMiddleware(Customers.getCustomer));

/**
 * Create a new customer 
 * @method post/customers
 */
router.post('/', [inputValidation('post', 'customers')], asyncMiddleware(Users.postUser));

/**
 * Modify details for a given customer
 * @method put/customers/:id
 * @param {number} customerid id du customer
 */
router.put('/:id', [auth, role('CUSTOMER', 'ADMIN')], Customers.putCustomer);


// Listing all orders for a given Customer 
// GET /customers/:id/orders (all)
// router.get('/:id/orders', customerController.getAllCustomerOrders);

// Listing specific order for a given Customer
// GET /customers/:customerid/orders/:orderid (all)
// router.get('/:customerid/orders/:orderid', customerController.getCustomerSpecificOrder);

// Delete a customer
// DELETE /customers/:id (admin, pro user)

module.exports = router;


/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     tags:
 *       - Customer
 *     description: Create a new User of type customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *             enum:
 *               - ADMIN
 *               - CUSTOMER
 *               - VENDOR
 *             default: CUSTOMER
 *     responses:
 *       201:
 *         description: Return saved User of type customer
 *         schema:
 *            properties:
 *               userId:
 *                 type: number
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               email:
 *                 type: string
 *               role:
 *                  type: string
 *                  enum:
 *                    - CUSTOMER
 *                    - ADMIN
 *                    - VENDOR
 *       400:
 *         description: Internal error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     description: Get a customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Return customer detail
 *         schema:
 *            properties:
 *               userId:
 *                 type: number
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               email:
 *                 type: string
 *               role:
 *                  type: string
 *                  enum:
 *                    - CUSTOMER
 *                    - ADMIN
 *                    - VENDOR
 *                  default: CUSTOMER
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 *     security:
 *       - JWT: []
 */

 
/**
 * @swagger
 * /api/v1/customers/{id}:
 *   put:
 *     tags:
 *       - Customer
 *     description: Modify details of a customer for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer id
 *         in: path
 *         required: true
 *       - name: customer
 *         description: Customer object
 *         in: body
 *         required: true
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *           phoneNumber:
 *             type: string
 *     responses:
 *       200:
 *         description: Return customer detail
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 *     security:
 *       - JWT: []
 */
