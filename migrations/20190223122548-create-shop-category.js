'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('ShopCategory', {
      shopCategoryId: {
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
          len: [3,25] // only allow values with length between x and y
        }
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
      },
      createdAt: DataTypes.DATE(6),
      updatedAt: DataTypes.DATE(6)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ShopCategory');
  }
};