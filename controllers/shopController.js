/**
 * @module controller/Shop
 */

const Models = require('../models/');
const asyncMiddleware = require('../middleware/async');
const Joi = require('joi');

class Shops {
  // TODO: Listing all shop for a given City id / @function get/:id/shops 
 
  /**
   * @function getShops
   * Listing all shop 
   * @param {*} req 
   * @param {*} res 
   */
  static getShops(req, res, next) {

    // getShopsNearby
    if(req.query.hasOwnProperty('lat') && req.query.hasOwnProperty('lon')){
      Shops.getShopsNearby(req.query)
        .then( result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(400).json({message: err.message});
        })
    }
    
    // getShopsByName
    if(req.query.hasOwnProperty('name')){
      Shops.getShopsByName(req.query.name)
        .then( result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(400).json({message: err.message});
        })
    }

    // getShops with pagination
    if(req.params.hasOwnProperty('page')){
      let limit = 20;   // number of records per page
      let offset = 0;

      Models.Shop.findAndCountAll({where: {deleted: 0}},{raw: true})
        .then((data) => {
          let page = req.params.page; // page number
          let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
          return Models.Shop.findAll({
            where: {deleted: 0},
            limit: limit,
            offset: offset
          })
            .then(result => {
              if(!result.length) { 
                const err = new Error('No shops found !!!');
                err.status = 404;
                return next(err);
              }
              res.status(200).json({'result': result, 'count': data.count, 'pages': pages});
            })
        })
    }

    // aucun paramètre n'est demandé -> error 400
    if(Object.getOwnPropertyNames(req.params).length < 1 
      && Object.getOwnPropertyNames(req.query).length < 1){
        const err = new Error('Please use a valid Shop route');
        err.status = 400;
        return next(err);
    }
  }

  static getShopsByName(searchTerm) {
       
    let name = searchTerm.slice(1,-1);

    return new Promise((resolve, reject) => {
      // FIXME: faire fonctionner la même requête sur postgres et mysql 
      // Models.Shop.findAll({
      //   where: {
      //     $and: [
      //       Models.sequelize.where(
      //         Models.sequelize.fn(
      //           'lower', Models.sequelize.col('name')
      //         ),
      //         { like: '%' + name.trim() + '%' } 
      //       ),
      //     ]
      //   }
      // },{raw: true})
      //   .then(result => {
      //     if (Array.isArray(result) && !result.length) {
      //       reject({message: 'No shops Found for the given name'});
      //     }
      //     resolve(result);
      //   })

      if(process.env.NODE_ENV === 'testpostgres' || process.env.NODE_ENV === 'herokuprod'){
        Models.Shop.findAll({
          where: {
            $or: [
              { 'name': { ilike: '%' + name.trim() + '%' } }
            ]
          }
        },{raw: true})
          .then(result => {
            if (Array.isArray(result) && !result.length) {
              reject({message: 'No shops Found for the given name'});
            }
            resolve(result);
          })
      }else{
        Models.Shop.findAll({
          where: {
            $or: [
              { 'name': { like: '%' + name.trim() + '%' } }
            ]
          }
        },{raw: true})
          .then(result => {
            if (Array.isArray(result) && !result.length) {
              reject({message: 'No shops Found for the given name'});
            }
            resolve(result);
          })
      }
      
    });
  }

  static getShopsByCategory(req, res, next) {

    let limit = 20;   // number of records per page
    let offset = 0;

    Models.Shop.findAndCountAll({
      include: [{
        model: Models.ShopCategory
      }],
      where: {deleted: 0}
    },{raw: true})
      .then((data) => {
        let page = req.params.page; // page number
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        return Models.Shop.findAll({
          include: [{
            model: Models.ShopCategory,
            required: true,
            where: {shopCategoryId: req.params.idCategory},
            attributes: ['shopCategoryId', 'name']
          }],
          where: {deleted: 0},
          limit: limit,
          offset: offset
        })
          .then(result => {
            if(!result.length) { 
              const err = new Error('No shops for the given id category');
              err.status = 404;
              return next(err);
            }
            res.status(200).json({'result': result, 'count': data.count, 'pages': pages});
          })
      })
  }

  /**
   * @function findNearbyShops
   * Permet de retrouver les shops autours d'un utilisateur (positionné par sa longitude et sa latitude) 
   * sur un rayon donné par le paramètre range
   * @param {float} query.lon Longitude de l'utilisateur
   * @param {float} query.lat Latitude de l'utilisateur
   * @param {int} query.range Distance de recherche
   * @returns {array} Tableau contenant des shops
   */
  static getShopsNearby(query) {
    return new Promise((resolve, reject) => {
      const range = query.range ? query.range : 1000; // distance à 1km par defaut
      // Note x is longitude and y is latitude
      // rend en mètre
      if(process.env.NODE_ENV === 'testpostgres' || process.env.NODE_ENV === 'herokuprod'){
        Models.sequelize.query(`SELECT shop_id, name, phone_number, email, ST_Distance('SRID=4326;POINT(${query.lon} ${query.lat})'::geometry, location::geometry) * 106000 AS distance FROM shop WHERE ST_Distance('SRID=4326;POINT(${query.lon} ${query.lat})'::geometry, location::geometry) * 106000 < ${range} AND deleted = 0 ORDER BY distance ASC`, { 
          type: Models.sequelize.QueryTypes.SELECT,
        })
          .then(result => {
            if (Array.isArray(result) && !result.length) {
              reject({message: 'No shops Found arround the coordinates'});
            }
            resolve(result);
          })
      }else{
        Models.sequelize.query(`SELECT shop_id, name, phone_number, email,
          ROUND(ST_Distance(POINT(?,?), location), 6) * 106000 AS distance
          FROM shop
          WHERE ST_Distance(POINT(?,?), location) * 106000 < ?
          AND deleted = 0
          ORDER BY distance ASC`, { 
          type: Models.sequelize.QueryTypes.SELECT,
          replacements: [query.lon, query.lat, query.lon, query.lat, range]
        })
          .then(result => {
            if (Array.isArray(result) && !result.length) {
              reject({message: 'No shops Found arround the coordinates'});
            }
            resolve(result);
          })
      }

    });
  }

  /**
   * @function getShop
   * Details of a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static getShop(req, res, next) {

    Models.Shop.findByPk(req.params.id)
      .then(result => {
        if (!result) {
          const err = new Error('No Shop Found for the given id');
          err.status = 404;
          return next(err);
        }
        res.status(200).json(result);
      })
  }

  /**
   * @function getShopProducts
   * Listing all Product items for a given shop
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static getShopProducts(req, res, next) {
    Models.Product.findAll({
      where: {
        shopId: req.params.id,
        deleted: 0
      }
    })
      .then(result => {
        if(Array.isArray(result) && !result.length) {
          const err = new Error('No Products Found for the given id');
          err.status = 404;
          return next(err);
        }
        res.status(200).json(result);
      })
  }

  /**
   * @function getShopProduct
   * Listing specific Product for a given shop
   * @param {object} req 
   * @param {int} req.params.productid id du produit à trouver
   * @param {int} req.params.shopid id du shop à trouver
   * @param {*} res 
   */
  static getShopProduct(req, res, next) {
    Models.Product.findOne({
      where: { productId: req.params.productid, shopId: req.params.shopid },
    })
      .then(result => {
        if (!result) {
          const err = new Error('Product or Shop Not Found');
          err.status = 404;
          return next(err);
        }
        res.status(200).json(result);
      })
  }

  /**
   * @function postShop
   * Create a new shop
   * @param {*} req 
   * @param {*} res 
   */
  static postShop(req, res, next) {
    // TODO: JOI sur longitude latitude 
    return Models.Shop.create({
      name: req.body.name,
      siret: req.body.siret,
      siren: req.body.siren,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude,req.body.latitude],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    })
      .then(result => {
        // le shop a des categories associées
        if(req.body.hasOwnProperty('categories') && req.body.categories.length){
          // on ajoute les categories au shop
          return result.addShopCategories(req.body.categories)
            .then( () => {
            // pour renvoyé le shop et c categories, on recherche le shop et sa categorie
              return Models.Shop.findByPk(result.get('shopId'), {
                include: [ { model: Models.ShopCategory, through: 'ShopsCategory' } ]
              });
            });
        }else{
          return result;
        }
      })
      .then(result => {
        res.status(201).json(result);
      })
  }

  /**
   * @function putShop
   * Modify a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static async putShop(req, res, next) {
    let shop = await Models.Shop.findByPk(req.params.id)
    if(!shop) {
      const err = new Error('this shop don\'t exist');
      err.status = 404;
      return next(err);
    }

    let location;
    if(req.body.hasOwnProperty('longitude') && req.body.hasOwnProperty('latitude')){
      location = {
        type: 'Point',
        coordinates: [req.body.longitude,req.body.latitude],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    }else{
      location = {
        type: 'Point',
        coordinates: [shop.location.coordinates[0], shop.location.coordinates[1]],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    }
    
    await shop.update({
      name: req.body.name || shop.name,
      siret: req.body.siret || shop.siret,
      siren: req.body.siren || shop.siren,
      phoneNumber: req.body.phoneNumber || shop.phoneNumber,
      email: req.body.email || shop.email,
      location: location
    })  

    res.status(200).send(shop);
  }

  /**
   * @function deleteShop
   * Modify a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static deleteShop(req, res, next) {
    Models.Shop.findById(req.params.id)
      .then(shop => {
        if(!shop) {
          const err = new Error('this shop don\'t exist');
          err.status = 404;
          return next(err);
        }
        return shop.update({
          deleted: 1
        })  
          .then(() => {
            res.status(200).send(shop);
          });
      })
  }

}

module.exports = Shops;