const Models = require('../models/');

class Orders{

  static async getOrdersCustomer(req, res, next){
    // retrieve the order and their associated products for sending
    let order = await Models.Order.findAll({
      where: {customerId: req.params.id},
      include: {model: Models.OrderDetail}
    });

    if(!order){
      const err = new Error('error on finding the order');
      err.status = 404;
      return next(err);
    }

    res.status(200).json(order);
  }

  static getOrderCustomer(req, res, next){

  }

  static async getOrdersShop(req, res, next){
    // retrieve the order and their associated products for sending
    let order = await Models.Order.findAll({
      where: {shopId: req.params.id},
      include: {model: Models.OrderDetail}
    });

    if(!order){
      const err = new Error('error on finding the order');
      err.status = 404;
      return next(err);
    }

    res.status(200).json(order);
  }

  static getOrderShop(req, res, next){

  }

  static async postOrder(req, res, next){

    // create the order
    let order = await Models.Order.create({
      customerId: req.params.idCustomer, 
      shopId: req.params.idShop,
      date: Date.now(),
    });

    // create the associated product
    for(let product of req.body.products){
      await Models.OrderDetail.create({
        orderId: order.get('orderId'), 
        productId: product.id,
        quantity: product.quantity
      });
    }

    // retrieve the order and their associated products for sending
    order = await Models.Order.findByPk(order.get('orderId'),{
      include: {model: Models.OrderDetail}
    });

    res.status(201).json(order);
  }

}

module.exports = Orders;