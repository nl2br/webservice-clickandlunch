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
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
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
      foreignKey: models.Customer.id,
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
 *       id:
 *         type: integer
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       deleted:
 *        type: boolean
 *        default: false
 */