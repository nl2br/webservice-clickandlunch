
/**
 * @module Models/ShopCategory
 */

module.exports = (sequelize, DataTypes) => {

  let ShopCategory = sequelize.define('ShopCategory', {
    shopCategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$', // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,25] // only allow values with length between x and y
      }
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });

  // Class Method
  ShopCategory.associate = function (models) {
    ShopCategory.belongsToMany(models.Shop, { // add foreign key to Product
      through: 'ShopsCategory',
      foreignKey: 'shopCategoryId'
    });
  };

  return ShopCategory;
};

// SHOPCATEGORY Sequelize functions
// addShop
// addShops
// countShops
// createShop
// getShops
// hasShop
// hasShops
// removeShop
// removeShops

/**
 * @swagger
 * definition:
 *  ShopCategory:
 *    properties:
 *      shopCategoryId:
 *        type: number
 *      name:
 *        type: string
 *      deleted:
 *        type: boolean
 *      createdAt:
 *        type: date
 *      updatedAt:
 *        type: date
 */
