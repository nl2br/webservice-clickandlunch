/**
 * Routes des products
 * @module routes/products
 * @requires controllers/productController
 */
const express = require('express');
const router = express.Router();
const Products = require('../controllers/productController');

/**
 * Get details for a given id product (all user)
 * @method get/products/:id
 */
router.get('/:id', Products.getProduct);

/**
 * Create a new product (admin, pro user)
 * @method post/products
 */
router.post('/', Products.postProduct);


/**
 * Create a new product (admin, pro user)
 * @method post/products/menus
 */
router.post('/menus', Products.postProductMenu);

module.exports = router;

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     description: Get a product or menu detail for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: product id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Return product detail
 *         schema:
 *            oneof:
 *              - $ref: '#definitions/Product'
 *              - $ref: '#definitions/Menu'
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Internal error
 */

/**
 * @swagger
 * /api/v1/products/menus:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Menu'
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/Menu'
 *       400:
 *         description: Internal error
 */