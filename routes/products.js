/**
 * Routes des products
 * @module routes/products
 * @requires controllers/productController
 */
const express = require('express');
const router = express.Router();
const Products = require('../controllers/productController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const asyncMiddleware = require('../middleware/async');
const inputValidation = require('../middleware/inputValidation');
const multer  = require('multer');

const multipleUpload = multer().array('file');

/**
 * Get details for a given id product (all user)
 * @method get/products/:id
 */
router.get('/:id', [inputValidation('get', 'products')], asyncMiddleware(Products.getProduct));

/**
 * Create a new product (admin, pro user)
 * @method post/products/shops/:id
 */
router.post('/shops/:id', [auth, role('VENDOR', 'ADMIN'), multipleUpload], asyncMiddleware(Products.postProduct));


/**
 * Create a new product (admin, pro user)
 * @method post/products/menus/shops/:id
 */
router.post('/menus/shops/:id', [auth, role('VENDOR', 'ADMIN'), multipleUpload], asyncMiddleware(Products.postProductMenu));

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
 * /api/v1/products/shops/{id}:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         description: id of the shop to which the product belongs
 *         in: path
 *         required: true
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *         description: name of the product
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *         description: description of the product
 *       - name: price
 *         in: formData
 *         required: true
 *         type: number
 *         description: price of the product
 *       - name: productType
 *         in: formData
 *         required: true
 *         type: string
 *         enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *         description: type of the product
 *       - name: file
 *         in: formData
 *         description: The uploaded file data
 *         required: false
 *         type: file
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Internal error
 *     security:
 *       - JWT: []
 */

/**
 * @swagger
 * /api/v1/products/menus/shops/{id}:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         description: id of the shop to which the product belongs
 *         in: path
 *         required: true
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *         description: name of the product
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *         description: description of the product
 *       - name: price
 *         in: formData
 *         required: true
 *         type: number
 *         description: price of the product
 *       - name: listProducts
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *          type: integer
 *         description: id of the products you want to add to the menu
 *       - name: file
 *         in: formData
 *         description: The uploaded file data
 *         required: false
 *         type: file
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/Menu'
 *       400:
 *         description: Internal error
 *     security:
 *       - JWT: []
 */