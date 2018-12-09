const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Listing all shop 
// GET /shops (all)
router.get('/', shopController.getAllShops);

// Listing shop details for a given shop 
// GET /shops/:id (all)
router.get('/:id', shopController.getShop);

// Listing all product items for a given shop 
// GET /shops/:id/products (all)
router.get('/:id/products', shopController.getAllShopProducts);

// Listing specific product for a given shop
// GET /shops/:shopid/products/:productid (all)
router.get('/:shopid/products/:productid', shopController.getShopSpecificProduct);

// Create a new shop
// POST /shops (admin, pro user)
router.post('/', shopController.postAddShop);

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)

module.exports = router;