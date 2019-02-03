const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  let Shop = sequelize.define('Shop', {
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    location: {
      /** OpenStreetMap est basé sur des mesures GPS 
       * et est donc capable de détecter et de lire le système WGS84.
       * Ce système est référencé 4326 en deux dimensions (X,Y)
       * mesuré en mètres */
      type: DataTypes.GEOMETRY('POINT', 4326), 
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    // Timestamps
    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6)
  });

  // Class Method
  Shop.associate = function (models) {
    Shop.hasMany(models.Product, { // add foreign key to Product
      foreignKey: 'shop_id'
    });
  };

  Shop.prototype.findNearbyShops = async function (long, lat, range) {
    // Note x is longitude and y is latitude
    let result = await sequelize.query(`SELECT id, ST_AsText(pt) AS point, name, ROUND(ST_Distance(POINT(?,?), pt), 2) AS distance
      FROM poi
      WHERE ST_Distance(POINT(?,?), pt) < ?
      AND type = 'Shop'
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
  }
  // Shop.prototype.findNearbyShops = function (long, lat, range) {
  //   return Shop.findAll({
  //     where: Sequelize.where(
  //       Sequelize.fn('ST_Within', 
  //         Sequelize.col('Location'),
  //         Sequelize.fn('ST_SetSRID', 
  //           Sequelize.fn('ST_MakePoint', 
  //           long, lat), 4326),
  //         +range * 0.016),
  //       true)
  //   })
  //   .catch(error => {
  //     console.log('error findNearbyShops : ', error.message);
  //   });

//     SELECT shop_id, ST_AsText(location) AS point, name, ROUND(ST_Distance(POINT(9,4), location), 2) AS distance
//       FROM shop
//       WHERE ST_Distance(POINT(9,4), location) < 4.5
//       ORDER BY distance ASC;
// SELECT `shop_id`, `name`, `location`, `deleted`, `created_at`, `updated_at` 
// 	FROM `Shop` AS `Shop` 
// 	WHERE ST_Within(`Location`, ST_SetSRID(ST_MakePoint(9, 4), 4326), 0.07200000000000001) = true;
// SELECT `shop_id`, `name`, ST_AsText(location) 
// 		FROM `Shop` 
// 		WHERE ST_Within(`Location`,SRID(GeomFromText('POINT(9,4)', 4326)));
  // }

  return Shop;
};



/**
 * @swagger
 * definition:
 *   Shop:
 *     properties:
 *       shop_id:
 *         type: integer
 *       name:
 *         type: string
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

// async function test() {
//   const shop = await Models.Shop.create({name: 'Armenian Shop'});
//   const product1 = await Models.Product.create({name: 'kumkuat', shop_id: + shop.get('shop_id') });
//   const product2 = await Models.Product.create({name: 'kumkuat 2', shop_id: + shop.get('shop_id') });
//   shop.setProducts([product1,product2])
//   shop.getProducts().then( products => {
//     products.forEach(product => {
//       console.log(product.dataValues)
//     });
//   })
// }
// test();


