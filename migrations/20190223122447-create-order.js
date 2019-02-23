'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Order', {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Please enter a customer id'
        },
        // references: {
        //   model: 'Customer',
        //   key: 'customer_id'
        // }
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Please enter a shop id'
        },
        // references: {
        //   model: 'Shop',
        //   key: 'shop_id'
        // }
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
    return queryInterface.dropTable('Order');
  }
};