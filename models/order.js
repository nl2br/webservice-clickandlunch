module.exports = (sequelize, DataTypes) => {

  let Order = sequelize.define('Order', {
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
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
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