module.exports = (sequelize, DataTypes) => {

  let Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  Customer.associate = function (models) {

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customer_id',
    });

  };

  return Customer;

}

/**
 * @swagger
 * definition:
 *   Customer:
 *     properties:
 *       customer_id:
 *         type: integer
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 */