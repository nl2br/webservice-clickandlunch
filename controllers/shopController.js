const Shop = require('../models').Shop;
const Dishe = require('../models').Dishe;

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

// Listing all Dishe items for a given shop 
// GET /shops/:id/dishes (all)
exports.getAllShopDishes = (req, res, next) => {
  Dishe.findAndCountAll({
    where: {
      shop_id: req.params.id
    }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error getAllShopDishes : ', err.message));
};

// Listing specific Dishe for a given shop
// GET /shops/:shopid/dishes/:disheid (all)
// exports.getShopSpecificDishe = (req, res, next) => {
//   Shop.findAll({
//     attributes: [],
//     where: {
//       shop_id: req.params.shopid
//     },
//     include: [{ 
//       model: Dishe, 
//       as: 'Dishe', 
//       where: { dishe_id: req.params.disheid },
//     }]
//   })
//     .then(result => {
//       console.log("ce que je veux envoyer", JSON.stringify(result[0].Dishe))
//       res.status(200).json(result);
//     })
//     .catch(err => console.log('error getShopSpecificDishe : ', err.message));
// };
exports.getShopSpecificDishe = (req, res, next) => {
  Dishe.findOne({
    where: {dishe_id: req.params.disheid, shop_id: req.params.shopid},
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error getShopSpecificDishe : ', err.message));
};

// Create a new shop
// POST /shops (admin, pro user)

// Modify details for a given shop
// PUT /shops/:id (admin, pro user)

// Delete a shop
// DELETE /shops/:id (admin, pro user)