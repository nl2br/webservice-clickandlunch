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
    )
      .then(() => {
        // Customer belongsto User
        return queryInterface.addColumn(
          'Customer', // name of Source model
          'customerId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'User', // name of Target model
              key: 'userId', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        );
      })
      .then(() => {
        // Vendor belongsto User
        return queryInterface.addColumn(
          'Vendor', // name of Source model
          'vendorId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'User', // name of Target model
              key: 'userId', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        );
      })
      .then(() => {
        // Vendor belongsto Shop
        return queryInterface.addColumn(
          'Vendor', // name of Source model
          'shopId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Shop', // name of Target model
              key: 'shopId', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove Shop hasMany Product
    return queryInterface.removeColumn(
      'Product', // name of the Target model
      'shopId' // key we want to remove
    )
      .then(() => {
        // Remove Customer belongsto User
        return queryInterface.removeColumn(
          'Customer', // name of the Target model
          'customerId' // key we want to remove
        );
      })
      .then(() => {
        // Remove Vendor belongsto User
        return queryInterface.removeColumn(
          'Vendor', // name of the Target model
          'vendroId' // key we want to remove
        );
      })
      .then(() => {
        // Remove Vendor belongsto User
        return queryInterface.removeColumn(
          'Vendor', // name of the Target model
          'shopId' // key we want to remove
        );
      });
  }
};
