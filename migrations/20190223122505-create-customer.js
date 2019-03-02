'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Customer', {
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