module.exports = (sequelize, DataTypes) => {

  let Order = sequelize.define('Order', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'order_id',
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
      // },
      field: 'customer_id',
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
      // },
      field: 'shop_id',
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'order'
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderDetail, { // add foreign key order_id to OrderDetail
      foreignKey: 'orderId',
      // onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Customer, { // customer_id inserted into order
      foreignKey: 'customerId',
      targetKey: 'customerId'
      // onDelete: 'CASCADE'
    });
  };

  return Order;
};

/**
 * @swagger
 * definition:
 *   Order:
 *     properties:
 *       orderId:
 *         type: integer
 *       date:
 *         type: date
 *       customerId:
 *         type: integer
 *       shopId:
 *         type: integer
 *       deleted:
 *        type: boolean
 *        default: false
 */