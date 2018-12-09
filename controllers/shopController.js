const Models = require('../models/');

// validation input
const Joi = require('joi');

// Listing all shop 
// GET /shops (all)
exports.getAllShops = (req, res, next) => {
  Models.Shop.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log('error getAllShops', error.message);
      res.status(400).send(error);
    })
};

// Listing shop details for a given shop 
// GET /shops/:id (all)
exports.getShop = (req, res, next) => {
  Models.Shop.findByPk(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).send({message: 'No Shop Found for the given id'});
      }
      res.status(200).json(result);
    })
    .catch(error => {
      console.log('error getShop : ', error.message);
      res.status(400).send(error);
    });
};

// Listing all Product items for a given shop 
// GET /shops/:id/Products (all)
exports.getAllShopProducts = (req, res, next) => {
  Models.Product.findAll({
    where: {
      shop_id: req.params.id
    }
  })
    .then(result => {
      if (Array.isArray(result) && !result.length) {
        return res.status(404).send({message: 'No Products Found for the given id'});
      }
      res.status(200).json(result);
    })
    .catch(error => {
      console.log('error getAllShopProducts : ', error.message);
      res.status(400).send(error);
    });
};

// Listing specific Product for a given shop
// GET /shops/:shopid/Products/:Productid (all)
exports.getShopSpecificProduct = (req, res, next) => {
  Models.Product.findOne({
    where: { product_id: req.params.productid, shop_id: req.params.shopid },
  })
    .then(result => {
      if (!result) {
        return res.status(404).send({message: 'Product or Shop Not Found'});
      }
      res.status(200).json(result);
    })
    .catch(error => {
      console.log('error getShopSpecificProduct : ', error.message);
      res.status(400).send(error);
    });
};

// Create a new shop
// POST /shops (admin, pro user)
exports.postAddShop = (req, res, next) => {
  Models.Shop.create({
    name: req.body.name
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    console.log('error postAddShop : ', error.message);
    res.status(400).send(error);
  })

};

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)