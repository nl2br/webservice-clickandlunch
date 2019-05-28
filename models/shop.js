
/**
 * @module Models/Shop
 */
const ValidationRegexp = require('../utils/validationRegex');
// TODO: créer le modèle CONFIGURATION
// TODO: créer le modèle BANKACCOUNT
module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
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
        is: ValidationRegexp.name(),
        notEmpty: true, // don't allow empty strings
        len: [3,25] // only allow values with length between x and y
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(),
        notEmpty: true // don't allow empty strings
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.name(),
        notEmpty: true // don't allow empty strings
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ValidationRegexp.postalCode(),
        len: [5,5],
        isNumeric: true
      },
      field: 'postal_code',
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
  },{
    tableName: 'shop',
    // FIXME: using mysql 'like' with postgres to avoid multiple query for different type of bdd
    // indexes: [{
    //   name: 'name_search',
    //   unique: true,
    //   fields: [sequelize.fn('lower', sequelize.col('name'))], // postgres index for unsensitive case
    //   operator: 'varchar_pattern_ops'
    // }]
  });

  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: models.Shop.id
    });
    Shop.hasMany(models.Photo, { // add foreign key to Photo
      foreignKey: models.Shop.id
    });
    Shop.belongsToMany(models.ShopCategory, { 
      through: 'shopscategory',
      foreignKey: models.Shop.id
    });
  };

  return Shop;
};

// SHOP Sequelize functions :
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
 *      id:
 *        type: number
 *      name:
 *        type: string
 *      address:
 *        type: string
 *      city:
 *        type: string
 *      postalCode:
 *        type: number
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
