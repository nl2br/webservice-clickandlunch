'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Shop hasMany Product
    return queryInterface.addColumn(
      'Product', // name of Target model
      'shopId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shop', // name of Source model
          key: 'shopId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove Shop hasMany Product
    return queryInterface.removeColumn(
      'Product', // name of the Target model
      'shopId' // key we want to remove
    );
  }
};
