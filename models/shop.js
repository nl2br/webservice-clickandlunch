module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
  });

  Shop.associate = function (models) {

    Shop.hasMany(models.Product, {
      foreignKey: 'shop_id',
      as: 'Product'
    });

  };

  return Shop;

}



// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Shop = sequelize.define('shop', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   name: Sequelize.STRING,
// });

// Shop.associate = function (models) {

//   Shop.hasMany(models.Product, {
//     foreignKey: 'shop_id',
//     as: 'Product'
//   });

// };

// module.exports = Shop;