module.exports = (sequelize, DataTypes) => {

  let Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id',
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
      foreignKey: 'id',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customer_id',
      sourceKey: 'id'
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