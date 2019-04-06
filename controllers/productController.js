/**
 * @module controller/Product
 */
const Models = require('../models/');
const {uploadFile} = require('../config/as3');

class Products {

  /**
   * @function getProduct
   * Details of a product for a given id
   * @param {object} req 
   * @param {int} req.params.id id du product
   * @param {*} res 
   */
  static getProduct(req, res, next) {
    // rechercher si le produit demandé est de type MENU
    Models.Menu.findAll({where:{menuId: req.params.id}})
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
        });
    });
  }

  static getMenuProducts(menuId) {
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
      });
  }

  /**
   * @function postProduct
   * Create a new Product
   * @param {*} req 
   * @param {*} res 
   */
  static async postProduct(req, res, next) {
    let product = await Models.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price.replace(',' , '.'),
      productType: req.body.productType,
      shopId: req.params.id
    });
    
    // for the final response
    let include = [];

    // if photo was posted
    if(req.files){

      for(let i = 0; i<req.files.length;i++){
        // upload the photo to S3
        const data = await uploadFile(req.files[i], 'shop' + req.params.id, 'product'+(i+1));
        if(data instanceof Error){
          return next(data);
        }
        // add the url from S3 to DB
        await Models.Photo.create({
          url: data.Location,
          productId: product.get('productId')
        });
      }
      // for sending the photo's url
      include.push({model: Models.Photo});
    }

    // get all product information for response to the client
    if(include.length){
      product = await Models.Product.findByPk(product.get('productId'), {
        include: include
      });
    }else{
      product = await Models.Product.findByPk(product.get('productId'));
    }

    if(!product){
      const err = new Error('error on finding the product');
      err.status = 404;
      return next(err);
    }

    res.status(201).json(product);

  }

  /**
   * @function postProductMenu
   * Create a new Product menu
   * @param {*} req 
   * @param {*} res 
   */
  static async postProductMenu(req, res, next) {

    let menu = await Models.Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price.replace(',' , '.'),
      productType: 'MENU',
      shopId: req.params.id
    });

    let include = [];

    // adding products of the menu
    if(req.body.listProducts){
      let listProductsArray = req.body.listProducts.split ? req.body.listProducts.split(',').map(x => Number(x.replace(/["']+/g, ''))) : req.body.listProducts;
      for(let item of listProductsArray){
        await Models.Menu.create({
          menuId:menu.get('productId'),
          productId: item
        });
      }
      include.push({model: Models.Product, through: 'Menu', as: 'products'});
    }

    //adding the photo of the menu
    if(req.files){
      for(let i = 0; i<req.files.length;i++){
        // upload the photo to S3
        const data = await uploadFile(req.files[i], 'shop' + req.params.id + '/menu' + menu.get('productId'), 'product'+(i+1));
        // add the url from S3 to DB
        await Models.Photo.create({
          url: data.Location,
          productId: menu.get('productId')
        });
      }
      // for sending the photo's url
      include.push({model: Models.Photo});
    }

    // get all product information for response to the client
    if(include.length){
      menu = await Models.Product.findByPk(menu.get('productId'), {
        include: include
      });
    }else{
      menu = await Models.Product.findByPk(menu.get('productId'));
    }
    if(!menu){
      const err = new Error('error on finding the product');
      err.status = 404;
      return next(err);
    }

    res.status(201).json(menu);
  }

}

module.exports = Products;