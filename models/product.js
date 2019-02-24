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
      allowNull: false
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
      values: ['STARTER', 'DISH', 'DESSERT','DRINK','OTHER','MENU']
    },
    // TODO: créer le modèle PHOTO puis ajouter les relations
    // shopId: {
    //   type: DataTypes.INTEGER,
    //   // references: {
    //   //   model: 'Shop',
    //   //   key: 'shop_id'
    //   // }
    // },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });

  // Class Method
  Product.associate = function (models) {

    /**
     * Ajout d'une contrainte a produit :
     * Lorsqu'on delete un shop, ses produits associées sont supprimés
     */
    Product.belongsTo(models.Shop, { // add shop_id to product
      foreignKey: 'shopId',
      onDelete: 'CASCADE' // when deleting a shop, delete all his product
    });
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
 *       shopId:
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