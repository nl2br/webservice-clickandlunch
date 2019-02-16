/**
 * Routes des shops
 * @module routes/shops
 * @requires controllers/shopController
 */
const express = require('express');
const router = express.Router();
const Shops = require('../controllers/shopController');

/**
 * @swagger
 * /api/v1/shops/:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get a list of all shops
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all shops
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal error
 */
/**
 * Listing all shop (all user)
 * @method get/shops
 */
router.get('/', Shops.getShops);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get a list of all shops
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Shop id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Shop'
 *     responses:
 *       200:
 *         description: Return shop detail
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */
/**
 * Get shop details for a given shop  (all user)
 * @method get/shops/:id
 * @param {number} id id du shop
 */
router.get('/:id', Shops.getShop);

//TODO: swagger doc + controller
/**
 * Get shop details by name  (all user)
 * @method get/shops/:name
 * @param {string} name name du shop
 */
// router.get('/:name', Shops.getShopByName);

//TODO: swagger doc + controller
/**
 * Get shops around coordinates user  (all user)
 * @method get/shops/:long?/:lat?/:distance?
 * @param {number} id id du shop
 */
// router.get('/:long?/:lat?/:distance?', Shops.getShopNearby);

//TODO: swagger doc + controller
/**
 * Get shops of a given category (all user)
 * @method get/shops/:idCategory?
 * @param {number} id id du shop
 */
// router.get('/:idCategory?', Shops.getShopByCategory);

//TODO: swagger doc when product done
/**
 * Listing all product items for a given shop  (all user)
 * @method get/shops/:id/products
 * @param {number} id id du shop
 */
router.get('/:id/products', Shops.getShopProducts);

//TODO: swagger doc when product done
/**
 * Get specific product for a given shop  (all user)
 * @method get/shops/:shopid/products/:productid
 * @param {number} shopid id du shop
 * @param {number} productid id du produit
 */
router.get('/:shopid/products/:productid', Shops.getShopProduct);

/**
 * @swagger
 * /api/v1/shops:
 *   post:
 *     tags:
 *       - Shop
 *     description: Create a new shop
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: shop
 *         description: Shop object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Shop'
 *     responses:
 *       201:
 *         description: Return saved shop
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal error
 */
/**
 * Create a new shop (admin, pro user)
 * @method post/shops
 */
router.post('/', Shops.postShop);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   put:
 *     tags:
 *       - Shop
 *     description: Modify details of a given shop
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Shop id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       - name: shop
 *         description: Shop object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Shop'
 *     responses:
 *       200:
 *         description: Return shop detail
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */
/**
 * Modify details for a given shop (admin, pro user)
 * @method put/shops/:id
 * @param {number} shopid id du shop
 */
router.put('/:id', Shops.putShop);

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   delete:
 *     tags:
 *       - Shop
 *     description: Delete a shop
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Shop id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Shop'
 *     responses:
 *       200:
 *         description: Shop has 'Deleted' to true 
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */
/**
 * Delete a shop (admin, pro user)
 * @method delete/shops/:id
 * @param {number} shopid id du shop
 */
router.delete('/:id', Shops.deleteShop);

module.exports = router;








