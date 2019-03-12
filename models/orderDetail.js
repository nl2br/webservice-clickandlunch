module.exports = (sequelize, DataTypes) => {

  let OrderDetail = sequelize.define('OrderDetail', {
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
  },{
    tableName: 'order_detail'
  });

  OrderDetail.removeAttribute('id');

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE' // when delete an order, delete all orderDetail
    });
    OrderDetail.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE' // when delete a product, delete all orderDetail
    });
  };

  return OrderDetail;
};