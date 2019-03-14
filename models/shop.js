
/**
 * @module Models/Shop
 */
const ValidationRegexp = require('../utils/validationRegex');

module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shopId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'shop_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(),
        notEmpty: true, // don't allow empty strings
        len: [3,25] // only allow values with length between x and y
      }
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [14,14],
        isNumeric: true
      }
    },
    siren: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [9,9],
        isNumeric: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.phone()
      },
      field: 'phone_number',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'A user with this email already exists.',
      },
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    location: {
      // OpenStreetMap est basé sur des mesures GPS 
      // et est donc capable de détecter et de lire le système WGS84.
      // Ce système est référencé 4326 en deux dimensions (X,Y) => longitude, latitude
      // mesuré en mètres 
      type: DataTypes.GEOMETRY('POINT', 4326), 
      allowNull: false,
      validate: {
        // is: '[0-9][x][0-9]{50}'
        min: -180,
        max: 180
      }
    },
    // TODO: créer le modèle PHOTO puis ajouter les relations
    // TODO: créer le modèle CONFIGURATION
    // TODO: créer le modèle BANKACCOUNT
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'shop'
  });


  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: 'shop_id'
    });
    Shop.belongsToMany(models.ShopCategory, { // add foreign key to Product
      through: 'shopscategory',
      foreignKey: 'shop_id'
    });
  };

  return Shop;
};

// SHOP Sequelize functions
// addProduct
// addProducts
// addShopCategories
// addShopCategory
// createProduct
// createShopCategory
// countProducts
// getProducts
// getShopCategories
// hasProduct
// hasProducts
// hasShopCategories
// hasShopCategory
// removeProduct
// removeProducts
// removeShopCategory
// removeShopCategories
// setProducts
// setShopCategories

/**
 * @swagger
 * definition:
 *  Shop:
 *    properties:
 *      shopId:
 *        type: number
 *      name:
 *        type: string
 *      siret:
 *        type: string
 *      siren:
 *        type: string
 *      phoneNumber:
 *        type: string
 *      email:
 *        type: string
 *      location:
 *        type: object
 *        properties:
 *          type: 
 *            type: string
 *          coordinates:
 *            type: array
 *            items:
 *              type: number
 *      deleted:
 *        type: boolean
 *      createdAt:
 *        type: date
 *      updatedAt:
 *        type: date
 */
