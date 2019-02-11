/**
 * Routes des products
 * @module routes/products
 * @requires controllers/productController
 */
const express = require('express');
const router = express.Router();
const Products = require('../controllers/productController');

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - product
 *     description: Get a product detail for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: product id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/product'
 *     responses:
 *       200:
 *         description: Return product detail
 *         schema:
 *           $ref: '#/definitions/product'
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */
/**
 * Get details for a given id product (all user)
 * @method get/products/:id
 */
router.get('/:id', Products.getProduct);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/product'
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/product'
 *       400:
 *         description: Internal error
 */
/**
 * Create a new product (admin, pro user)
 * @method post/products
 */
router.post('/', Products.postProduct);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/product'
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/product'
 *       400:
 *         description: Internal error
 */
/**
 * Create a new product (admin, pro user)
 * @method post/products/menus
 */
router.post('/menus', Products.postProductMenu);

module.exports = router;
