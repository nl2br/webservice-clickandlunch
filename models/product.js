/**
 * @module Models/Product
 */
const ValidationRegexp = require('../utils/validationRegex');

module.exports = (sequelize, DataTypes) => {

  // Model definition
  const Product = sequelize.define('Product', {
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
        is: {
          args: [ValidationRegexp.name()],
          msg: 'Product name must be in format like a-z A-Z À-ÿ 0-9 and - \' ", are accepted'
        },
        notEmpty: true, // don't allow empty strings
        len: [3,100] // only allow values with length between x and y
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: {
          args: [ValidationRegexp.description()],
          msg: 'description name must be in format like a-z A-Z À-ÿ 0-9 and - \' ! ? ", are accepted'
        }, // allow letter uppper lower number space
        notEmpty: true, // don't allow empty strings
        len: [3,500] // only allow values with length between x and y
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
    tableName: 'product'
  });

  // Class Method
  Product.associate = function (models) {

    Product.belongsTo(models.Shop, { // add shop_id to product
      foreignKey: 'shopId',
      onDelete: 'CASCADE' // when deleting a shop, delete all his product
    });

    Product.hasMany(models.Photo, { // add foreign key to Photo
      foreignKey: 'productId'
    });

    Product.belongsToMany(models.Product,{
      as: 'menus', 
      foreignKey: 'productId', 
      through: 'Menu', 
      otherKey: 'menuId'
    });

    Product.belongsToMany(models.Product,{
      as: 'products', 
      foreignKey: 'menuId', 
      through: 'Menu', // {model: models.Menu ,unique:false, primaryKey:true}
      otherKey: 'productId'
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
 *       id:
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
 *       shopId:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   Menu:
 *     properties:
 *       id:
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
 *       shopId:
 *         type: integer
 *       listProducts:
 *         type: array
 *         items:
 *           type: integer
 */