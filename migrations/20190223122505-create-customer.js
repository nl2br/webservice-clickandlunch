'use strict';
const ValidationRegexp = require('../utils/validationRegex');

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Customer', {
      customerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        validate: {
          is: ValidationRegexp.name(), // allow letter uppper lower number space
          notEmpty: true, // don't allow empty strings
          len: [3,100] // only allow values with length between x and y
        }
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          is: ValidationRegexp.name(), // allow letter uppper lower number space
          notEmpty: true, // don't allow empty strings
          len: [3,100] // only allow values with length between x and y
        }
      },
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
    return queryInterface.dropTable('Customer');
  }
};