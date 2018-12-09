const Product = require('../models').Product;

/*
*
*   Methods definition of the class Product
*
*/

// Class Method
// Product.associate = function (models) {
//   console.log('test')
// };

// Instance Method
Product.prototype.getFullname = function () {
  return [this.name, this.id_shop].join(' ');
};

// console.log(Product.build({ name: 'maki', id_shop: 1 }).getFullname())

/*
*
*   API REST Sequelize for Product
*
*/

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log('error finding all Products : ', error.message)
      res.status(400).send(error);
    });
}