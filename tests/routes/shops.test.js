const request = require('supertest');
const Models = require('../../models/');

let server;

describe('/api/v1/shops', () => {

  beforeEach(() => { server = require('../../app'); })

  afterEach(async () => { await server.close(); })
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000)

  describe('api get/shops', () => {
    it('Return all shops', async () => {
      await Models.Shop.create({name: 'Asia Shop 3'});
      const res = await request(server).get('/api/v1/shops');
      console.log('res.body',res.body);
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  })

  describe('api get/shops/:id', () => {
    it('Return one specific shop', async () => {
      
      const shop = await Models.Shop.create({name: 'Asia Shop'});
      const res = await request(server).get('/api/v1/shops/' + shop.get('shop_id'));
      expect(res.status).toBe(200);
      expect(res.body).toEqual(shop.dataValues);
    })
  })

  describe('api put/shops/:id', () => {
    it('Modify shop with valid data', async () => {
      const shop = await Models.Shop.create({name: 'my shop'});

      const res = await request(server)
        .put('/api/v1/shops/' + shop.get('shop_id'))
        .send({name: 'your shop'});

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('your shop');
    });
  });

})

test('shop : return 2 products', async () => {
  let shop = await Models.Shop.create({name: 'Armenian Shop'});
  const product1 = await Models.Product.create({name: 'kumkuat', shop_id: shop.get('shop_id') });
  const product2 = await Models.Product.create({name: 'kumkuat 2', shop_id: shop.get('shop_id') });
  shop.setProducts([product1,product2]);
  shop.getProducts().then( products => {
      expect(products.length).toBe(2);
  });
  // await Models.Product.destroy({where: {}})
  // .catch(error => {
  //   console.log('error destroy shop : ', error.message);
  //   // return res.status(400).send(error);
  // });
});
