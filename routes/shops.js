/**
 * Routes des shops
 * @module routes/shops
 * @requires controllers/shopController
 */
const express = require('express');
const router = express.Router();
const Shops = require('../controllers/shopController');

/**
 * Listing all shop (all user)
 * @method get/shops
 */
router.get('/', Shops.getShops);

/**
 * Listing shop details for a given shop  (all user)
 * @method get/shops/:id
 * @param {number} id id du shop
 */
router.get('/:id', Shops.getShop);

/**
 * Listing all product items for a given shop  (all user)
 * @method get/shops/:id/products
 * @param {number} id id du shop
 */
router.get('/:id/products', Shops.getShopProducts);

/**
 * Listing specific product for a given shop  (all user)
 * @method get/shops/:shopid/products/:productid
 * @param {number} shopid id du shop
 * @param {number} productid id du produit
 */
router.get('/:shopid/products/:productid', Shops.getShopProduct);

/**
 * Create a new shop (admin, pro user)
 * @method post/shops
 */
router.post('/', Shops.postShop);

/**
 * Modify details for a given shop (admin, pro user)
 * @method post/shops/:id
 * @param {number} shopid id du shop
 */
router.put('/:id', Shops.putShop);

/**
 * Delete a shop (admin, pro user)
 * @method delete/shops/:id
 * @param {number} shopid id du shop
 */
router.delete('/:id', Shops.deleteShop)

module.exports = router;