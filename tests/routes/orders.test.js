const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/orders', () => {

  beforeEach(async () => { 
    server = require('../../app'); 
  });
  afterEach(async () => { 
    await server.close();     
  });
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000);

  describe('GET /:id', () => {
    it('Return all orders for a valid shop ID', async () => {
      // création du shop et de 2 produits
      let shop = await Models.Shop.create({
        name: 'Fruity Land',    
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'test@test9.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      const shopId = shop.get('shop_id');
      const product1 = await Models.Product.create({name: 'Milk shake Framboise', price: '9.90', shop_id: shopId });
      const product2 = await Models.Product.create({name: 'Cake Miel Harissa', price: '9.90', shop_id: shopId });
      const product3 = await Models.Product.create({name: 'ananas', price: '9.90',shop_id: shopId });
      const product4 = await Models.Product.create({name: 'piepie', price: '9.90',shop_id: shopId });
      // création du customer
      let customer = await Models.Customer.create({first_name: 'Looping', last_name: 'Barracuda'});
      // création de la commande
      let order = await Models.Order.create({date: Date.now(), customer_id: customer.get('customer_id'), shop_id: shopId});
      // ajout des produits dans la commande
      let orderDetail1 = await Models.OrderDetail.create({order_id: order.get('order_id'), product_id: product1.get('product_id'), quantity: 1});
      let orderDetail2 = await Models.OrderDetail.create({order_id: order.get('order_id'), product_id: product2.get('product_id'), quantity: 1});
      // shop.setProducts([product1,product3]);
      // order.setOrderDetails([orderDetail1, orderDetail2]);
      // order.setCustomer(customer.get('customer_id'));
      // order.setShop(shopId);
      Models.Order.findAll({ // Nested Eager Loading
        include: [{
          model: Models.OrderDetail,
          attributes: ['product_id','quantity'],
          include: [{
            model: Models.Product, 
            attributes: ['name']
          }] 
        }],
        // include: [{ all: true, nested: true }],
        where: {shop_id: shopId, deleted: false}
      })
        .then( orders => {
          // console.log('array order', JSON.stringify(orders));
          
        });
      // await Models.Product.destroy({where: {}})
      // .catch(error => {
      //   console.log('error destroy product : ', error.message);
      //   // return res.status(400).send(error);
      // });
      // await Models.Shop.destroy({where: {}})
      // .catch(error => {
      //   console.log('error destroy shop : ', error.message);
      //   // return res.status(400).send(error);
      // });
    });
  });

});
