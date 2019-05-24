/**
 * @module Models/Product
 */
const ValidationRegexp = require('../utils/validationRegex');

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Product = sequelize.define('Product', {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'product_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(), // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: ValidationRegexp.description(), // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,250] // only allow values with length between x and y
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        is: ValidationRegexp.price(),
        notEmpty: true
      }
    },
    // TODO: créer un enum js productType plutot qu'un enum MySQL
    productType: {
      type: DataTypes.ENUM, 
      values: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU'],
      field: 'product_type',
    },
    shopId: {
      type: DataTypes.INTEGER,
      field: 'shop_id'
    },
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'product'
  });

  // Class Method
  Product.associate = function (models) {

    Product.belongsTo(models.Shop, { // add shop_id to product
      foreignKey: 'shop_id',
      onDelete: 'CASCADE' // when deleting a shop, delete all his product
    });

    Product.hasMany(models.Photo, { // add foreign key to Photo
      foreignKey: 'product_id'
    });

    Product.belongsToMany(models.Product,{
      as: 'menus', 
      foreignKey: 'product_id', 
      through: 'Menu', 
      otherKey: 'menu_id'
    });

    Product.belongsToMany(models.Product,{
      as: 'products', 
      foreignKey: 'menu_id', 
      through: 'Menu', // {model: models.Menu ,unique:false, primaryKey:true}
      otherKey: 'product_id'
    });

    // addMenu
    // addMenus
    // countMenus
    // createMenu
    // getMenus
    // getProducts
    // hasMenu
    // hasMenus
    // hasProduct
    // hasProducts
    // removeMenu
    // removeMenus
    // removeProduct
    // removeProducts
    // setMenus


  };

  return Product;

};

/**
 * @swagger
 * definition:
 *   Product:
 *     properties:
 *       productId:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: text
 *       price:
 *         type: decimal
 *       productType:
 *         type: string
 *         enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *       id:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   Menu:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: text
 *       price:
 *         type: decimal
 *       productType:
 *         type: string
 *         enum: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
 *       shop_id:
 *         type: integer
 *       listProducts:
 *         type: array
 *         items:
 *           type: integer
 */