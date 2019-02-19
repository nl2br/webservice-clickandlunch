
/**
 * @module Models/Shop
 */

module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shopId: {
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
        is: '(0|\\+33|0033)[1-9][0-9]{8}'
      }
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
    // TODO: créer le modèle SHOPCATEGORY
    // TODO: créer le modèle CONFIGURATION
    // TODO: créer le modèle BANKACCOUNT
    // TODO: créer le modèle PROFESSIONNAL
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6)
  });


  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: 'shopId'
    });
  };

  return Shop;
};

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



// Automatic functions

// addProduct
// addProducts
// countProducts
// createProduct
// getProducts
// hasProduct
// hasProducts
// removeProduct
// removeProducts
// setProducts