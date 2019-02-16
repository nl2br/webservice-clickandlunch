
/**
 * @module Models/Shop
 */

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
    phone_number: {
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
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });


  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: 'shop_id'
    });
  };

  /**
   * @function findNearbyShops
   * Permet de retrouver les shops autours d'un utilisateur (positionné par sa longitude et sa latitude) 
   * sur un rayon donné par le paramètre range
   * @param {float} long Longitude de l'utilisateur
   * @param {float} lat Latitude de l'utilisateur
   * @param {int} range Distance de recherche
   * @returns {array} Tableau contenant des shops
   */
  Shop.prototype.findNearbyShops = async function (long, lat, range) {
    // Note x is longitude and y is latitude
    // rend en mètre
    let result = await sequelize.query(`SELECT shop_id, ST_AsText(location) AS point, name, 
      ROUND(ST_Distance(POINT(?,?), location), 6) * 106000 AS distance
      FROM shop
      WHERE ST_Distance(POINT(?,?), location) * 106000 < ?
      ORDER BY distance ASC`, { 
      type: sequelize.QueryTypes.SELECT,
      replacements: [long, lat, long, lat, range]
      // model: Projects,
      // mapToModel: true
    })
      .catch(error => {
        console.log('error findNearbyShops : ', error.message);
      });
    return result;
  };

  return Shop;
};



/**
 * @swagger
 * definition:
 *  Shop:
 *    properties:
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
 *      longitude:
 *        type: number
 *      latitude:
 *        type: number
 *        
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