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
    }
  });

  // Shop.associate = function (models) {

  //   Shop.hasMany(models.Product, {
  //     foreignKey: 'shop_id',
  //     as: 'Product'
  //   });

  // };

  return Customer;

}