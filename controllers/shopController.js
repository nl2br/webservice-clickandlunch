const Shop = require('../models').Shop;
const Product = require('../models').Product;

// validation input
const Joi = require('joi');

// Listing all shop 
// GET /shops (all)
exports.getAllShops = (req, res, next) => {
  Shop.findAndCountAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log('error getAllShops', err.message)
    })
};

// Listing shop details for a given shop 
// GET /shops/:id (all)
exports.getShop = (req, res, next) => {
  Shop.findAll({
    where: {
      shop_id: req.params.id
    }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error getShop : ', err.message));
};

// Listing all Product items for a given shop 
// GET /shops/:id/Products (all)
exports.getAllShopProducts = (req, res, next) => {
  Product.findAndCountAll({
    where: {
      shop_id: req.params.id
    }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error getAllShopProducts : ', err.message));
};

// Listing specific Product for a given shop
// GET /shops/:shopid/Products/:Productid (all)
exports.getShopSpecificProduct = (req, res, next) => {
  Product.findOne({
    where: { product_id: req.params.productid, shop_id: req.params.shopid },
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error getShopSpecificProduct : ', err.message));
};

// Create a new shop
// POST /shops (admin, pro user)

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)