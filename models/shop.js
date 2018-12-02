module.exports = (sequelize, DataTypes) => {

  const Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
  });

  Shop.associate = function(models) {

    Shop.hasMany(models.Dishe, {
      foreignKey: 'shop_id', 
      as: 'Dishe'
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

// module.exports = Shop;