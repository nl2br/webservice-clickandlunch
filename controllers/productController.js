/**
 * @module controller/Product
 */

const Models = require('../models/');
const { Product } = Models;

class Products {

  /**
   * @function getProduct
   * Details of a product for a given id
   * @param {object} req 
   * @param {int} req.params.id id du product
   * @param {*} res 
   */
  static getProduct(req, res) {
    // rechercher si le produit demandé est de type MENU
    Models.Menu.findAll({where:{menu_id: req.params.id}})
      .then(result => {
        if (result.length === 0) {
          Products.getNormalProduct(req.params.id)
            .then( result => {
              res.status(200).json(result);
            })
            .catch(error => {
              console.log('error getMenuProducts : ', error.message);
              res.status(400).send(error);
            });
        }else{
          Products.getMenuProducts(req.params.id)
            .then( result => {
              res.status(200).json(result);
            })
            .catch(error => {
              console.log('error getMenuProducts : ', error.message);
              res.status(400).send(error);
            });
        }
      })
      .catch(error => {
        console.log('error getProduct : ', error.message);
        res.status(400).send(error);
      });
  }

  static getNormalProduct(menuId) {
    return new Promise((resolve, reject) => {
      Models.Product.findByPk(menuId)
        .then(result => {
          if (!result) {
            reject({message: 'No product Found for the given id'});
          }
          resolve(result);
        })
        .catch(error => {
          console.log('error getNormalProduct : ', error.message);
          reject({message: error});
        });
    });
  }

  static getMenuProducts(menuId) {
    console.log('getMenuProducts', menuId);
    const listProducts = Models.sequelize.query(`select menu.product_id, 
      (select product.name from product where product.product_id = menu.product_id) name,
      (select product.description from product where product.product_id = menu.product_id) description,
      (select product.price from product where product.product_id = menu.product_id) price, 
      (select product.product_type from product where product.product_id = menu.product_id) product_type
      from product
      inner join menu on menu.menu_id = product.product_id
      where product.product_id = ?`, { 
        type: Models.sequelize.QueryTypes.SELECT,
        replacements: [menuId]
      });

    const menu = Models.Product.findByPk(menuId);

    return Promise.all([menu, listProducts])
      .then(result => {
        let res = result[0].dataValues;
        Object.assign(res, {
          listProducts: result[1]
        });
        return res;
      })
      .catch(error => {
        console.log('error promise all : ', error.message);
        return error.message;
      });
  }

  /**
   * @function postProduct
   * Create a new Product
   * @param {*} req 
   * @param {*} res 
   */
  static postProduct(req, res) {
    Models.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      product_type: req.body.productType
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.log('error postProduct : ', error.message);
      res.status(400).send(error);
    });
  }

  /**
   * @function postProductMenu
   * Create a new Product menu
   * @param {*} req 
   * @param {*} res 
   */
  static postProductMenu(req, res) {
    Models.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      product_type: req.body.productType
    })
    .then(result => {
      req.body.listProducts.forEach(async item => {
        console.log('item',item);
        await Models.Menu.create({
          menu_id:result.product_id,
          product_id: item
        })
        .catch(error => {
          console.log('error menu creation : ', error.message);
          res.status(400).send(error);
        });
      });
      res.status(201).json(result);
    })
    .catch(error => {
      console.log('error postProduct : ', error.message);
      res.status(400).send(error);
    });
  }

}

module.exports = Products;