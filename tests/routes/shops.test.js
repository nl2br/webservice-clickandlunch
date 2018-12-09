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
      await Models.Shop.create({name: 'Asia Shop'});
      const res = await request(server).get('/api/v1/shops');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  })

  describe('GET /:id', () => {
    it('Return one specific shop', async () => {
      const shop = await Models.Shop.create({name: 'Asia Shop'});
      const res = await request(server).get('/api/v1/shops/' + shop.get('shop_id'));
      expect(res.status).toBe(200);
      expect(res.body).toEqual(shop.dataValues);
    })
  })

})
