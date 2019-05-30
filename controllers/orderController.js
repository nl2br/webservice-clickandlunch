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

  /**
   * Get all orders for a given id shop  
   * @param {Object} req 
   * @param {Object} res 
   * @param {Object} next 
   * @return {JSON} 
   */
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
    if(!Number(req.params.idCustomer)){
      const err = new Error('idCustomer is needed and must be a number');
      err.status = 400;
      return next(err);
    }

    if(!Number(req.params.idShop)){
      const err = new Error('idShop is needed and must be a number');
      err.status = 400;
      return next(err);
    }
    
    // generate the order number
    let d = new Date();
    let orderNumber = `${d.getDate().toString().padStart(2, '0')}${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}-${req.params.idCustomer.toString().padStart(4, '0')}`;

    // create the order
    let order = await Models.Order.create({
      date: Date.now(),
      orderNumber: orderNumber,
      recoveryTime: req.body.recoveryTime,
      state: Models.Order.getOrderStates().DEFAULT,
      customerId: req.params.idCustomer, 
      shopId: req.params.idShop,
    });

    // create the associated product
    for(let product of req.body.products){
      await Models.OrderDetail.create({
        orderId: order.get('id'), 
        productId: product.id,
        quantity: product.quantity
      });
    }

    // retrieve the order and their associated products for sending
    order = await Models.Order.findByPk(order.get('id'),{
      include: {model: Models.OrderDetail}
    });

    //emit the order to the vendor
    

    res.status(201).json(order);
  }

}

module.exports = Orders;