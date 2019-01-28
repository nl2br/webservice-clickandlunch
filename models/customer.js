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
    }
  });

  Customer.associate = function (models) {

    Customer.hasMany(models.Order, { // add foreign key to order
      foreignKey: 'customer_id',
    });

  };

  return Customer;

}