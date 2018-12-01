module.exports = (sequelize, DataTypes) => {

  const Shop = sequelize.define('Shop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
  });

  Shop.associate = function(models) {
    models.Shop.hasMany(models.Dishe, {
      foreignKey: 'id_shop', 
      as: 'Dishes'
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