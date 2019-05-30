/**
 * Order model Sequelize definition
 * @module Order
 * @param sequelize
 * @param DataTypes
 * @return {Object} Order
 */
const ValidationRegexp = require('../utils/validationRegex');

module.exports = (sequelize, DataTypes) => {

  const States = Object.freeze({
    DEFAULT: 'default',
    ACCEPTED: 'accepted',
    CANCELED: 'cancecled',
    FINISHED: 'finished',
    PAID: 'paid'
  });

  let Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.orderNumber(),
        notEmpty: true, 
        len: [11,11],
      },
      field: 'order_number',
    },
    recoveryTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [ValidationRegexp.recoveryTime()],
          msg: 'Must be in this format \'HH:MM\' in 24 hours'
        },
        notEmpty: true,
        len: [5,5],
      },
      field: 'recovery_time',
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    state: { 
      type: DataTypes.ENUM, 
      values: Object.keys(States),
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a customer id'
      },
      field: 'customer_id',
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter a shop id'
      },
      field: 'shop_id',
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
      targetKey: 'id'
      // onDelete: 'CASCADE'
    });
  };

  Order.getOrderStates = function() {
    return States;
  };

  return Order;
};

/**
 * @swagger
 * definition:
 *   Order:
 *     properties:
 *       id:
 *         type: integer
 *       orderNumber:
 *         type: string
 *       recoveryTime:
 *         type: string
 *       date:
 *         type: date
 *       state:
 *         type: string
 *         enum:
 *           - DEFAULT
 *           - ACCEPTED
 *           - CANCELED
 *           - FINISHED
 *           - PAID
 *       customerId:
 *         type: integer
 *       shopId:
 *         type: integer
 *       deleted:
 *        type: boolean
 *        default: false
 */