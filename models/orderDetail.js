module.exports = (sequelize, DataTypes) => {

  let OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // references: {
      //   model: 'Order',
      //   key: 'order_id'
      // }
    },
    product_id: {
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
    }
  },{
    tableName: 'order_detail'
  });

  OrderDetail.removeAttribute('id');

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE' // when delete an order, delete all orderDetail
    });
    OrderDetail.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE' // when delete a product, delete all orderDetail
    });
  }

  return OrderDetail;
}