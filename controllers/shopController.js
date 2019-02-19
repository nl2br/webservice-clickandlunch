/**
 * @module controller/Shop
 */

const Models = require('../models/');

class Shops {
  // TODO: Listing all shop for a given City id / @function get/:id/shops 
 
  /**
   * @function getShops
   * Listing all shop 
   * @param {*} req 
   * @param {*} res 
   */
  static getShops(req, res) {

    console.log('req.query',req.query);
    console.log('req.params',req.params);

    // getShopsNearby
    if(req.query.hasOwnProperty('lat') && req.query.hasOwnProperty('lon')){
      Shops.getShopsNearby(req.query)
        .then( result => {
          res.status(200).json(result);
        })
        .catch(error => {
          console.log('error getShops : ', error.message);
          res.status(400).send(error);
        });
    }
    
    //TODO: shops?name=XXX + swagger doc 
    // if(req.query.name){
    // }

    // TODO: handle route with idcategory when MODEL PRODUCT CATEGORY done
    // if(req.query.idcategory){
    // }

    // getShops with pagination
    if(req.params.hasOwnProperty('page')){
      console.log('pagination');
      let limit = 20;   // number of records per page
      let offset = 0;

      Models.Shop.findAndCountAll({where: {deleted: 0}},{raw: true})
        .then((data) => {
          let page = req.params.page; // page number
          let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
          Models.Shop.findAll({
            where: {deleted: 0},
            limit: limit,
            offset: offset
          })
            .then(result => {
              res.status(200).json({'result': result, 'count': data.count, 'pages': pages});
            })
            .catch(error => {
              console.log('error getShops', error.message);
              res.status(400).send(error);
            });
        })
        .catch(error => {
          console.log('error getShops', error.message);
          res.status(400).send(error);
        });
    }
  }


  /**
   * @function findNearbyShops
   * Permet de retrouver les shops autours d'un utilisateur (positionné par sa longitude et sa latitude) 
   * sur un rayon donné par le paramètre range
   * @param {float} params.lon Longitude de l'utilisateur
   * @param {float} params.lat Latitude de l'utilisateur
   * @param {int} params.range Distance de recherche
   * @returns {array} Tableau contenant des shops
   */
  static getShopsNearby(query) {
    return new Promise((resolve, reject) => {
      const range = query.range ? query.range : 1000; // distance à 1km par defaut
      // Note x is longitude and y is latitude
      // rend en mètre
      Models.sequelize.query(`SELECT shopId, name, phoneNumber, email, 
        ROUND(ST_Distance(POINT(?,?), location), 6) * 106000 AS distance
        FROM shop
        WHERE ST_Distance(POINT(?,?), location) * 106000 < ?
        AND deleted = 0
        ORDER BY distance ASC`, { 
        type: Models.sequelize.QueryTypes.SELECT,
        replacements: [query.lon, query.lat, query.lon, query.lat, range]
      })
        .then(result => {
          if (!result) {
            reject({message: 'No shops Found arround the coordinates'});
          }
          resolve(result);
        })
        .catch(error => {
          console.log('error getShopsNearby : ', error.message);
          reject({message: error});
        });
    });
  }

  /**
   * @function getShop
   * Details of a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static getShop(req, res) {
    Models.Shop.findByPk(req.params.id)
      .then(result => {
        if (!result) {
          return res.status(404).send({message: 'No Shop Found for the given id'});
        }
        res.status(200).json(result);
      })
      .catch(error => {
        console.log('error getShop : ', error.message);
        res.status(400).send(error);
      });
  }

  /**
   * @function getShopByName
   * Details of a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static getShopByName(req, res) {
    res.status(200).json({message: 'by name'});
  }

  /**
   * @function getShopProducts
   * Listing all Product items for a given shop
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static getShopProducts(req, res) {
    Models.Product.findAll({
      where: {
        shopId: req.params.id,
        deleted: 0
      }
    })
      .then(result => {
        if (Array.isArray(result) && !result.length) {
          return res.status(404).send({message: 'No Products Found for the given id'});
        }
        res.status(200).json(result);
      })
      .catch(error => {
        console.log('error getAllShopProducts : ', error.message);
        res.status(400).send(error);
      });
  }

  /**
   * @function getShopProduct
   * Listing specific Product for a given shop
   * @param {object} req 
   * @param {int} req.params.productid id du produit à trouver
   * @param {int} req.params.shopid id du shop à trouver
   * @param {*} res 
   */
  static getShopProduct(req, res) {
    Models.Product.findOne({
      where: { productId: req.params.productid, shopId: req.params.shopid },
    })
      .then(result => {
        if (!result) {
          return res.status(404).send({message: 'Product or Shop Not Found'});
        }
        res.status(200).json(result);
      })
      .catch(error => {
        console.log('error getShopSpecificProduct : ', error.message);
        res.status(400).send(error);
      });
  }

  /**
   * @function postShop
   * Create a new shop
   * @param {*} req 
   * @param {*} res 
   */
  static postShop(req, res) {
    // TODO: JOI sur longitude latitude 
    Models.Shop.create({
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
        res.status(201).json(result);
      })
      .catch(error => {
        console.log('error postShop : ', error.message);
        res.status(400).send(error);
      });
  }

  /**
   * @function putShop
   * Modify a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static putShop(req, res) {
    Models.Shop.findById(req.params.id)
      .then(shop => {
        if(!shop) {return res.status(404).send({message:'this shop don\'t exist'});}
        if(req.body.longitude && req.body.latitude){
          return shop.update({
            name: req.body.name || shop.name,
            siret: req.body.siret || shop.siret,
            siren: req.body.siren || shop.siren,
            phoneNumber: req.body.phoneNumber || shop.phoneNumber,
            email: req.body.email || shop.email,
            location: {
              type: 'Point',
              coordinates: [req.body.longitude,req.body.latitude],
              crs: {type: 'name', properties: { name: 'EPSG:4326'}}
            }
          })  
            .then(() => {
              res.status(200).send(shop);
            });
        }else{
          return shop.update({
            name: req.body.name || shop.name,
            siret: req.body.siret || shop.siret,
            siren: req.body.siren || shop.siren,
            phoneNumber: req.body.phoneNumber || shop.phoneNumber,
            email: req.body.email || shop.email,
            location: shop.location
          })  
            .then(() => {
              res.status(200).send(shop);
            });
        }
      })
      .catch(error => {
        console.log('error putShop : ', error.message);
        res.status(400).send({message: 'Error while trying to update the shop', data: error.message});
      });
  }

  /**
   * @function deleteShop
   * Modify a shop for a given id
   * @param {object} req 
   * @param {int} req.params.id id du shop
   * @param {*} res 
   */
  static deleteShop(req, res) {
    Models.Shop.findById(req.params.id)
      .then(shop => {
        if(!shop) {return res.status(404).send({message: 'this shop don\'t exist'});}
        return shop.update({
          deleted: 1
        })  
          .then(() => {
            res.status(200).send(shop);
          });
      })
      .catch(error => {
        console.log('error deleteShop : ', error.message);
        res.status(400).send({message: 'Error while trying to delete the shop', data: error.message});
      });
  }

}

module.exports = Shops;