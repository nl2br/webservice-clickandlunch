
/**
 * @module Models/ShopCategory
 */

module.exports = (sequelize, DataTypes) => {

  let ShopCategory = sequelize.define('ShopCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
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
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'shopcategory'
  });

  // Class Method
  ShopCategory.associate = function (models) {
    ShopCategory.belongsToMany(models.Shop, {
      through: 'shopscategory',
      foreignKey: models.ShopCategory.id
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
 *      id:
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
