const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;
let shop;
let customer;
let product1;
let product2;
let tokenCustomer;
let tokenVendor;

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

    beforeAll( async () =>{
      await truncate();
      // create the shop
      shop = await Models.Shop.create({
        name: 'Fruity Land',  
        address: '12 allée des palmiers',
        city: 'Rennes',
        postalCode: '35000',   
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'test@test9.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
    
      // create the products
      const shopId = shop.get('shopId');
      product1 = await Models.Product.create({name: 'Milk shake Framboise', price: '9.90', shopId: shopId });
      product2 = await Models.Product.create({name: 'Cake Miel Harissa', price: '9.90', shopId: shopId });
          
      // create the customer
      customer = await Models.User.create({
        firstname: 'nathan',
        lastname: 'lebreton',
        phoneNumber: '06639874521',
        email: 'a@a.com',
        password: 'mysecretpassword',
        role: 'CUSTOMER'
      });
      tokenCustomer = customer.generateAuthToken();
          
      // create the vendor
      customer = await Models.User.create({
        firstname: 'nathan',
        lastname: 'lebreton',
        phoneNumber: '06639874521',
        email: 'b@b.com',
        password: 'mysecretpassword',
        role: 'VENDOR'
      });
      tokenVendor = customer.generateAuthToken();

      // create the order
      let order = await Models.Order.create({date: Date.now(), customerId: customer.get('userId'), shopId: shop.get('shopId')});
      await Models.OrderDetail.create({orderId: order.get('orderId'), productId: product1.get('productId'), quantity: 1});
      await Models.OrderDetail.create({orderId: order.get('orderId'), productId: product2.get('productId'), quantity: 1});
    });

    it.skip('Return all orders for a valid shop ID', async () => {
      // création de la commande
      // ajout des produits dans la commande

      // shop.setProducts([product1,product3]);
      // order.setOrderDetails([orderDetail1, orderDetail2]);
      // order.setCustomer(customer.get('customer_id'));
      // order.setShop(shopId);
      Models.Order.findAll({ // Nested Eager Loading
        include: [{
          model: Models.OrderDetail,
          attributes: ['productId','quantity'],
          include: [{
            model: Models.Product, 
            attributes: ['name']
          }] 
        }],
        // include: [{ all: true, nested: true }],
        where: {shopId: shop.get('shopId'), deleted: 0}
      })
        .then( orders => {
          console.log('array order', JSON.stringify(orders));
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

    it('Return all orders for a valid customer ID', async () => {
      const res = await request(server).get('/api/v1/orders/customers/' + customer.get('userId')).set('x-auth-token', tokenCustomer);
      expect(res.status).toBe(200);
    });

    it('Return all orders for a valid shop ID', async () => {
      const res = await request(server).get('/api/v1/orders/shops/' + shop.get('shopId')).set('x-auth-token', tokenVendor);
      expect(res.status).toBe(200);
    });

  });

  describe('POST orders/shops/:idShop/customers/:idCustomer', () => {

    beforeAll( async () =>{
      await truncate();
      // create the shop
      shop = await Models.Shop.create({
        name: 'Fruity Land',   
        address: '12 allée des palmiers',
        city: 'Rennes',
        postalCode: '35000',  
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'test@test9.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
    
      // create the products
      const shopId = shop.get('shopId');
      product1 = await Models.Product.create({name: 'Milk shake Framboise', price: '9.90', shopId: shopId });
      product2 = await Models.Product.create({name: 'Cake Miel Harissa', price: '9.90', shopId: shopId });
          
      // create the customer
      customer = await Models.User.create({
        firstname: 'nathan',
        lastname: 'lebreton',
        phoneNumber: '06639874521',
        email: 'a@a.com',
        password: 'mysecretpassword',
        role: 'CUSTOMER'
      });
      tokenCustomer = customer.generateAuthToken();
    
    });

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

    it('Create an order for a given shop and a given customer', async () => {
      const res = await request(server)
        .post('/api/v1/orders/shops/' + shop.get('shopId') + '/customers/' + customer.get('userId'))
        .set('x-auth-token', tokenCustomer)
        .send({
          products: [{
            id: product1.get('productId'),
            quantity: 1
          },{
            id: product2.get('productId'),
            quantity: 1
          }]
        });

      expect(res.status).toBe(201);
    });
      
  });

});
