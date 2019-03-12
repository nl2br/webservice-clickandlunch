module.exports = (sequelize, DataTypes) => {

  let Customer = sequelize.define('Customer', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  },{
    tableName: 'customer'
  });

  Customer.associate = function (models) {

    Customer.belongsTo(models.User, {
      foreignKey: 'customerId',
      targetKey: 'userId',
      onDelete: 'CASCADE'
    });

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customerId',
      sourceKey: 'customerId'
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