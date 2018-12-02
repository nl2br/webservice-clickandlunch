const Shop  = require('../models').Shop;
const Dishe  = require('../models').Dishe;

exports.getAllShopDishes = (req, res, next) => {
  Dishe.findAndCountAll({
    where: {
      id_shop: req.params.id
    }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error finding all dishes for a shop : ', err.message));
}