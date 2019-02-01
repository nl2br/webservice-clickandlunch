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
      // references: {
      //   model: 'Customer',
      //   key: 'customer_id'
      // }
    },
    shop_id: {
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
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderDetail, { // add foreign key order_id to OrderDetail
      foreignKey: 'order_id',
      // onDelete: 'CASCADE'
    });
    Order.belongsTo(models.Customer, { // customer_id inserted into order
      foreignKey: 'customer_id',
      // onDelete: 'CASCADE'
    });
  };

  return Order;
}

/**
 * @swagger
 * definition:
 *   Order:
 *     properties:
 *       order_id:
 *         type: integer
 *       date:
 *         type: date
 *       customer_id:
 *         type: integer
 *       shop_id:
 *         type: integer
 *       deleted:
 *        type: boolean
 *        default: false
 */