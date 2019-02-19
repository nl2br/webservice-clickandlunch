const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;

// beforeAll( async () =>{
//   await truncate();
// });

describe('/api/v1/products', () => {

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

  describe('GET products', () => {

    beforeAll( async () =>{
      await truncate();

    });

    afterAll( async () =>{
      await Models.Shop.destroy({where: {name: 'Restaurant test'}});
      await truncate();
    });

    it('get specific product of type DISH', async () => {
      const shop = await Models.Shop.create({
        name: 'Restaurant test',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'testazerty@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      const p = await Models.Product.create({
        name: 'yahourt',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });

      const res = await request(server).get('/api/v1/products/' + p.get('productId'));

      // on le recupère depuis la BDD
      const newProduct = await Models.Product.findById(p.get('productId'));

      expect(res.status).toBe(200);
      expect(newProduct).not.toBeNull();
      expect(res.body.name).toEqual(newProduct.dataValues.name);
    });

    it('ERROR get specific product with an invalid id', async () => {
      const res = await request(server).get('/api/v1/products/999');
      expect(res.status).toBe(400);
      expect(res).toHaveProperty('error');
      expect(res.body.message).toBe('No product Found for the given id');
    });

    it('get specific product of type MENU', async () => {
      const shop = await Models.Shop.create({
        name: 'Restaurant test',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'testazerty2@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      const p1 = await Models.Product.create({
        name: 'salade chevre',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });
      const p2 = await Models.Product.create({
        name: 'poulet roti',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });
      const menu = await Models.Product.create({
        name: 'menu salade chevre poulet roti',
        description: 'description',
        price: '4.90',
        productType: 'MENU',
        shopId: shop.get('shopId')
      });
      await Models.Menu.create({
        menuId: menu.get('productId'),
        productId: p1.get('productId')
      });
      await Models.Menu.create({
        menuId: menu.get('productId'),
        productId: p2.get('productId')
      });
      console.log('Argument', menu.get('productId'));
      const res = await request(server).get('/api/v1/products/' +  menu.get('productId') );
      expect(res.status).toBe(200);
    });
  });

  describe('POST products/', () => {
    beforeAll( async () =>{
      await truncate();

    });
    afterAll( async () =>{
      await truncate();
    });
    it('Save a product with valid data', async () => {
      const shop = await Models.Shop.create({
        name: 'Restaurant test',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'testazerty@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      console.log('SHOPPPPPPPPPPPPPPPPPPPP', shop.get('shopId'));
      const res = await request(server)
        .post('/api/v1/products/')
        .send({
          name: 'product test 2',
          description: 'description product test',
          price: '9.90',
          productType: 'DISH',
          shopId: shop.get('shopId')
        });
      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.productId);

      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });

    it('Save a product menu type', async () => {
      const shop = await Models.Shop.create({
        name: 'Restaurant test',
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'atestazerty@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      const p1 = await Models.Product.create({
        name: 'salade',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });
      const p2 = await Models.Product.create({
        name: 'poulet',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });
      const p3 = await Models.Product.create({
        name: 'frite',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('shopId')
      });

      const res = await request(server)
        .post('/api/v1/products/menus')
        .send({
          name: 'menu salade poulet frite',
          description: 'description product test',
          price: '9.90',
          productType: 'MENU',
          shopId: shop.get('shopId'),
          listProducts: [p1.get('productId'), p2.get('productId'), p3.get('productId')]
        });
      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.productId);

      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });
  });


});
