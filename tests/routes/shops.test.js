const request = require('supertest');
const Models = require('../../models/');

let server;

describe('/api/v1/shops', () => {

  beforeEach(() => { server = require('../../app'); })
  afterEach(async () => { 
    await server.close(); 
    await Models.Shop.destroy({where: {}});
  })
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000)

  describe('GET /', () => {
    it('Return all shops', async () => {
      await Models.Shop.destroy({where: {}});
      await Models.Shop.create({name: 'Asia2 Shop'});
      const res = await request(server).get('/api/v1/shops');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  })

  describe('GET /:id', () => {
    it('Return one specific shop', async () => {
      await Models.Shop.destroy({where: {}});
      const shop = await Models.Shop.create({name: 'Asia Shop'});
      const res = await request(server).get('/api/v1/shops/' + shop.get('shop_id'));
      expect(res.status).toBe(200);
      expect(res.body).toEqual(shop.dataValues);
    })
  })

})

test('return 2 products', async () => {
  let shop = await Models.Shop.create({name: 'Armenian Shop'});
  const product1 = await Models.Product.create({name: 'kumkuat', shop_id: + shop.get('shop_id') });
  const product2 = await Models.Product.create({name: 'kumkuat 2', shop_id: + shop.get('shop_id') });
  shop.setProducts([product1,product2]);
  shop.getProducts().then( products => {
      expect(products.length).toBe(2);
  })
});
