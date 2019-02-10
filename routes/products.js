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

module.exports = router;
