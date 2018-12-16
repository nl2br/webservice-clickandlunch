const Models = require('../models/');

// validation input
const Joi = require('joi');

// Listing all shop 
// GET /shops (all)
exports.getAllShops = (req, res, next) => {
  Models.Shop.findAll()
    .then(shops => {
      return res.status(200).json(shops);
    })
    .catch(error => {
      console.log('error getAllShops', error.message);
      return res.status(400).send(error);
    })
};

// Listing all shop for a given City id
// GET /:id/shops (all)

// Listing shop details for a given shop 
// GET /shops/:id (all)
exports.getShop = (req, res, next) => {
  Models.Shop.findByPk(req.params.id)
    .then(shopDetails => {
      if (!shopDetails) {
        return res.status(404).send({message: 'No Shop Found for the given id'});
      }
      return res.status(200).json(shopDetails);
    })
    .catch(error => {
      console.log('error getShop : ', error.message);
      return res.status(400).send(error);
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
    .then(shopProducts => {
      if (Array.isArray(shopProducts) && !shopProducts.length) {
        return res.status(404).send({message: 'No Products Found for the given id'});
      }
      return res.status(200).json(shopProducts);
    })
    .catch(error => {
      console.log('error getAllShopProducts : ', error.message);
      return res.status(400).send(error);
    });
};

// Listing specific Product for a given shop
// GET /shops/:shopid/Products/:Productid (all)
exports.getShopSpecificProduct = (req, res, next) => {
  Models.Product.findOne({
    where: { product_id: req.params.productid, shop_id: req.params.shopid },
  })
    .then(specificProduct => {
      if (!specificProduct) {
        return res.status(404).send({message: 'Product or Shop Not Found'});
      }
      return res.status(200).json(specificProduct);
    })
    .catch(error => {
      console.log('error getShopSpecificProduct : ', error.message);
      return res.status(400).send(error);
    });
};

// Create a new shop
// POST /shops (admin, pro user)
exports.postAddShop = (req, res, next) => {
  Models.Shop.create({
    name: req.body.name
  })    
  .then(newShop => {
    return res.status(200).json(newShop);
  })
  .catch(error => {
    console.log('error postAddShop : ', error.message);
    return res.status(400).send(error);
  })

};

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)