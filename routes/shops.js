const express = require('express');
const router = express.Router();

// validation input
const Joi = require('joi');

// Require controllers modules
const shopController = require('../controllers/shopController');

// Request for listing all Dishe items of a given shop.
// GET /shops/:id/dishes 
router.get('/:id/dishes', shopController.getAllShopDishes);

module.exports = router;