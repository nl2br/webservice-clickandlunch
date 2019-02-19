module.exports = (sequelize, DataTypes) => {

  let Customer = sequelize.define('Customer', {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });

  Customer.associate = function (models) {

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customerId',
    });

  };

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