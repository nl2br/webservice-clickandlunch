/**
 * Shops Routes
 * @module routes/shops
 * @requires controllers/shopController
 */
const express = require('express');
const router = express.Router();
const Shops = require('../controllers/shopController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

/**
 * Listing all shop (all user)
 * @method get/shops
 */
router.get('/', Shops.getShops);

/**
 * Listing all shop with pagination (all user)
 * @method get/shops/p/:page
 */
router.get('/p/:page', Shops.getShops);


/**
 * Listing all shop of a category with pagination (all user)
 * @method get/shops/p/:page/category/:idCategory
 */
router.get('/p/:page/category/:idCategory', Shops.getShopsByCategory);

/**
 * Get shop details for a given shop  (all user)
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
 * Get specific product for a given shop  (all user)
 * @method get/shops/:shopid/products/:productid
 * @param {number} shopid id du shop
 * @param {number} productid id du produit
 */
router.get('/:shopid/products/:productid', Shops.getShopProduct);

/**
 * Create a new shop (admin, pro user)
 * @method post/shops
 */
router.post('/', [auth, role('VENDOR', 'ADMIN')], Shops.postShop);

/**
 * Modify details for a given shop (admin, pro user)
 * @method put/shops/:id
 * @param {number} shopid id du shop
 */
router.put('/:id', Shops.putShop);

/**
 * Delete a shop (admin, pro user)
 * @method delete/shops/:id
 * @param {number} shopid id du shop
 */
router.delete('/:id', Shops.deleteShop);

module.exports = router;



/**
 * @swagger
 * /api/v1/shops/p/{numberPage}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get a paginated list of all shops, 20 shops per request
 *     parameters:
 *       - name: numberPage
 *         description: page souhaitée
 *         in: path
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return an object
 *         schema:
 *            properties:
 *               count:
 *                  type: number
 *               pages:
 *                  type: number
 *               result:
 *                  type: array
 *                  items:
 *                    type: object
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/v1/shops/p/{numberPage}/category/{shopCategoryId}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get a paginated list of all shops for a given id shopCategory, 20 shops per request
 *     parameters:
 *       - name: numberPage
 *         description: page souhaitée
 *         in: path
 *         required: true
 *       - name: shopCategoryId
 *         description: categorie souhaitée
 *         in: path
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return an object
 *         schema:
 *            properties:
 *               count:
 *                  type: number
 *               pages:
 *                  type: number
 *               result:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       shopId:
 *                         type: number
 *                       name:
 *                         type: string
 *                       siret:
 *                         type: string
 *                       siren:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       email:
 *                         type: string
 *                       ShopCategories:
 *                         type: array
 *                         items:
 *                            type: object
 *                            properties:
 *                              shopCategoryId:
 *                                type: number
 *                              name:
 *                                 type: string  
 *                            
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/v1/shops?lat={lat}&lon={lon}&range={range}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get shops around position of a user
 *     parameters:
 *       - in: path
 *         name: lat
 *         type: number
 *         required: true
 *       - in: path
 *         name: lon
 *         type: number
 *         required: true
 *       - in: path
 *         name: range
 *         type: float
 *         required: false
 *         default: 1000
 *         description: en mètre
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all shops nearby the user longitude and latitude and the range
 *         properties:
 *           shopId:
 *             type: number
 *           name:
 *             type: string
 *           siret:
 *             type: string
 *           siren:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           email:
 *             type: string
 *           distance:
 *             type: number
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/v1/shops?name="{search}":
 *   get:
 *     tags:
 *       - Shop
 *     description: Return a list of shop corresponding to the searched term
 *     parameters:
 *       - in: path
 *         name: search
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all shops corresponding to the searched term
 *         schema:
 *           $ref: '#/definitions/Shop'
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   get:
 *     tags:
 *       - Shop
 *     description: Get a shop
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
 * @swagger
 * /api/v1/shops/:shopid/products/:productid:
 *   get:
 *     tags:
 *       - Shop
 *     description: Return a list of shop corresponding to the searched term
 *     parameters:
 *       - in: path
 *         name: shopid
 *         type: number
 *         required: true
 *         description: id du shop recherché
 *       - in: path
 *         name: productid
 *         type: number
 *         required: true
 *         description: id du produit recherché
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return the product's detail from the wanted shop
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

/**
 * @swagger
 * /api/v1/shops/:id/products:
 *   get:
 *     tags:
 *       - Shop
 *     description: Return a list of product corresponding to the searched shop
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: id du shop recherché
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return a products list from the wanted shop
 *         schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                   productId:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: text
 *                   price:
 *                     type: decimal
 *                   productType:
 *                     type: string
 *                     enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *                   shopId:
 *                     type: integer
 *       400:
 *         description: Internal error
 *       404:
 *         description: not found
 */

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
 *         properties:
 *           name:
 *             type: string
 *           siret:
 *             type: string
 *           siren:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           email:
 *             type: string
 *           longitude:
 *             type: number
 *           latitude:
 *             type: number
 *           categories:
 *             type: array
 *             items:
 *                type: number
 *     responses:
 *       201:
 *         description: Return saved shop
 *       400:
 *         description: Internal error
 *     security:
 *       - JWT: []
 */

/**
 * @swagger
 * /api/v1/shops/{id}:
 *   put:
 *     tags:
 *       - Shop
 *     description: Modify details of a shop for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Shop id
 *         in: path
 *         required: true
 *       - name: shop
 *         description: Shop object
 *         in: body
 *         required: true
 *         properties:
 *           name:
 *             type: string
 *           siret:
 *             type: string
 *           siren:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           email:
 *             type: string
 *           longitude:
 *             type: number
 *           latitude:
 *             type: number
 *     responses:
 *       200:
 *         description: Return shop detail
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */

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
 *       400:
 *         description: Internal Error
 *       404:
 *         description: Id not found
 */







