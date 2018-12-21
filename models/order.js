module.exports = (sequelize, DataTypes) => {

  let Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a customer id'
      },
      references: {
        model: 'Customer',
        key: 'customer_id'
      }
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a shop id'
      },
      references: {
        model: 'Shop',
        key: 'shop_id'
      }
    }
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'order_id'
    });
  };

  return Order;
}