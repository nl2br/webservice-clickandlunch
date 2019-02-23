'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('OrderDetail', {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        // references: {
        //   model: 'Order',
        //   key: 'order_id'
        // }
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        // references: {
        //   model: 'Product',
        //   key: 'product_id'
        // }
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      // Timestamps
      createdAt: DataTypes.DATE(6),
      updatedAt: DataTypes.DATE(6)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderDetail');
  }
};