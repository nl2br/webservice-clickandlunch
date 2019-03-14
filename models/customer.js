module.exports = (sequelize, DataTypes) => {

  let Customer = sequelize.define('Customer', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'customer_id',
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'customer'
  });

  Customer.associate = function (models) {

    Customer.belongsTo(models.User, {
      foreignKey: 'customerId',
      targetKey: 'userId',
      onDelete: 'CASCADE'
    });

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customer_id',
      sourceKey: 'customer_id'
    });

  };
  
  Customer.removeAttribute('id');

  return Customer;

};

/**
 * @swagger
 * definition:
 *   Customer:
 *     properties:
 *       customerId:
 *         type: integer
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 */