'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Product', {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$', // allow letter uppper lower number space
          notEmpty: true, // don't allow empty strings
          len: [3,100] // only allow values with length between x and y
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          is: '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$', // allow letter uppper lower number space
          notEmpty: true, // don't allow empty strings
          len: [3,250] // only allow values with length between x and y
        }
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
          is: '^[0-9]+([.,][0-9]{2})?$',
          notEmpty: true
        }
      },
      // TODO: créer un enum js productType plutot qu'un enum MySQL
      productType: {
        type: DataTypes.ENUM, 
        values: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
      },
      // TODO: créer le modèle PHOTO puis ajouter les relations
      // shopId: {
      //   type: DataTypes.INTEGER,
      //   // references: {
      //   //   model: 'Shop',
      //   //   key: 'shop_id'
      //   // }
      // },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      // Timestamps
      createdAt: DataTypes.DATE(6),
      updatedAt: DataTypes.DATE(6)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Product');
  }
};