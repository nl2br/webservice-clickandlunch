module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, {
      foreignKey: 'shop_id',
      as: 'Product'
    });
  };

  // Instance Method
  Shop.prototype.getFullname = function () {
    return [this.name, this.shop_id].join(' ');
  };

  return Shop;
}

