const Dishe  = require('../models').Dishe;

/*
*
*   Methods definition of the class Dishe
*
*/

// Class Method
// Dishe.associate = function (models) {
//   console.log('test')
// };

// Instance Method
Dishe.prototype.getFullname = function() {
  return [this.name, this.id_shop].join(' ');
};

console.log(Dishe.build({ name: 'maki', id_shop : 1 }).getFullname())

/*
*
*   API REST Sequelize for Dishe
*
*/

exports.getAllDishes = (req, res, next) => {
  Dishe.findAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log('error finding all dishes : ', err.message));
}