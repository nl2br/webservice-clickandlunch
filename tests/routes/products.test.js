const request = require('supertest');
const Models = require('../../models/');
truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

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
    it('get specific product of type DISH', async () => {
      const p = await Models.Product.create({
        name: 'yahourt',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });

      const res = await request(server).get('/api/v1/products/' + p.get('product_id'));

      // on le recupère depuis la BDD
      const newProduct = await Models.Product.findById(p.get('product_id'));

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
      const p1 = await Models.Product.create({
        name: 'salade chevre',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });
      const p2 = await Models.Product.create({
        name: 'poulet roti',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });
      const menu = await Models.Product.create({
        name: 'menu salade chevre poulet roti',
        description: 'description',
        price: '4.90',
        product_type: 'MENU'
      });
      await Models.Menu.create({
        menu_id: menu.get('product_id'),
        product_id: p1.get('product_id')
      });
      await Models.Menu.create({
        menu_id: menu.get('product_id'),
        product_id: p2.get('product_id')
      });
      console.log('Argument', menu.get('product_id'));
      const res = await request(server).get('/api/v1/products/' +  menu.get('product_id') );
      expect(res.status).toBe(200);
    });
  });

  describe('POST products/', () => {
    it('Save a product with valid data', async () => {
      const res = await request(server)
        .post('/api/v1/products/')
        .send({
          name: 'product test 2',
          description: 'description product test',
          price: '9.90',
          productType: 'DISH'
        });
      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.product_id);

      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });

    it('Save a product menu type', async () => {

      const p1 = await Models.Product.create({
        name: 'salade',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });
      const p2 = await Models.Product.create({
        name: 'poulet',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });
      const p3 = await Models.Product.create({
        name: 'frite',
        description: 'description',
        price: '4.90',
        product_type: 'DISH'
      });

      const res = await request(server)
        .post('/api/v1/products/menus')
        .send({
          name: 'menu salade poulet frite',
          description: 'description product test',
          price: '9.90',
          productType: 'MENU',
          listProducts: [p1.get('product_id'), p2.get('product_id'), p3.get('product_id')]
        });
      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.product_id);

      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });
  });


});
