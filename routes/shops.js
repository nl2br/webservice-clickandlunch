const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Listing all shop 
// GET /shops (all)
router.get('/', shopController.getAllShops);

// Listing shop details for a given shop 
// GET /shops/:id (all)
router.get('/:id', shopController.getShop);

// Listing all Dishe items for a given shop 
// GET /shops/:id/dishes (all)
router.get('/:id/dishes', shopController.getAllShopDishes);

// Listing specific Dishe for a given shop
// GET /shops/:shopid/dishes/:disheid (all)
router.get('/:shopid/dishes/:disheid', shopController.getShopSpecificDishe);

// Create a new shop
// POST /shops (admin, pro user)

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)

module.exports = router;