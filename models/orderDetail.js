module.exports = (sequelize, DataTypes) => {

  let OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'product_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  },{
    tableName: 'order_detail'
  });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
  }

  return OrderDetail;
}