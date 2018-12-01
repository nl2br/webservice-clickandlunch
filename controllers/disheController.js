const models  = require('../models');

/*
*
* Functions of the class Dishe
*
*/

const Dishe = models.Dishe

Dishe.prototype.getFullname = function() {
  return [this.name, this.id_shop].join(' ');
};

console.log(Dishe.build({ name: 'maki', id_shop : 1 }).getFullname())

/*
*
* API REST Sequelize for Dishe
*
*/

exports.getAllDishes = (req, res, next) => {
  models.Dishe.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error finding all dishes : ', err.message));
}