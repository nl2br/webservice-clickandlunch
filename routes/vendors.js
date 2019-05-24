/**
 * Vendor Routes
 * @module routes/vendors
 * @requires controllers/userController
 */
const express = require('express');
const router = express.Router();
const Vendors = require('../controllers/vendorController');
const Users = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');


/**
 * Get user details for a given vendor 
 * @method get/vendors/:id
 * @param {number} id id du vendor
 */
router.get('/:id', Vendors.getVendor);

// Listing all orders for a given Vendor 
// GET /vendors/:id/orders (all)
// router.get('/:id/orders', vendorController.getAllVendorOrders);

// Listing specific order for a given Vendor
// GET /vendors/:vendorid/orders/:orderid (all)
// router.get('/:vendorid/orders/:orderid', vendorController.getVendorSpecificOrder);

/**
 * Create a new vendor 
 * @method post/vendors
 */
router.post('/', Users.postUser);

/**
 * Modify details for a given vendor
 * @method put/vendors/:id
 * @param {number} vendorid id du vendor
 */
router.put('/:id', [auth, role('VENDOR', 'ADMIN')], Vendors.putVendor);

// Delete a vendor
// DELETE /vendors/:id (admin, pro user)

module.exports = router;


/**
 * @swagger
 * /api/v1/vendors:
 *   post:
 *     tags:
 *       - Vendor
 *     description: Create a new User of type vendor
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
 *             default: VENDOR
 *     responses:
 *       201:
 *         description: Return saved User of type vendor
 *         schema:
 *            properties:
 *               id:
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
 * /api/v1/vendors/{id}:
 *   get:
 *     tags:
 *       - Vendor
 *     description: Get a vendor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vendor id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Return vendor detail
 *         schema:
 *            properties:
 *               id:
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
 *                  default: VENDOR
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */

 
/**
 * @swagger
 * /api/v1/vendors/{id}:
 *   put:
 *     tags:
 *       - Vendor
 *     description: Modify details of a vendor for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vendor id
 *         in: path
 *         required: true
 *       - name: vendor
 *         description: Vendor object
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
 *         description: Return vendor detail
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 *     security:
 *       - JWT: []
 */
