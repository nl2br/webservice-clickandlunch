module.exports = (sequelize, DataTypes) => {

  let OrderDetail = sequelize.define('OrderDetail', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // references: {
      //   model: 'Order',
      //   key: 'order_id'
      // },
      field: 'order_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // references: {
      //   model: 'Product',
      //   key: 'product_id'
      // },
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  },{
    tableName: 'orderdetail'
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