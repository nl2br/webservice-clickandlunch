const request = require('supertest');
const Models = require('../../models/');

let server;

describe('/api/v1/shops', () => {

  beforeEach(() => { server = require('../../app'); });

  afterEach(async () => { 
    await server.close(); 
    await Models.Shop.destroy({where: {}});
  });
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000);

  describe('GET /', () => {
    it('Return all shops', async () => {
      // on créer un shop
      await Models.Shop.create({name: 'Asia Shop'});
      // on le recupère depuis la BDD
      const res = await request(server).get('/api/v1/shops');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /:id', () => {
    it('Return one specific shop', async () => {
      // on créer le shop
      const shop = await Models.Shop.create({name: 'Asia Shop'});
      // puis on tente de récupérer les infos de ce shop
      const res = await request(server).get('/api/v1/shops/' + shop.get('shop_id'));
      expect(res.status).toBe(200);
      expect(res.body).toEqual(shop.dataValues);
    });
  });

  describe('POST /', () => {
    it('Save a shop with valid data', async () => {
      // on enregistre un nouveau shop
      const res = await request(server)
        .post('/api/v1/shops/')
        .send({name: "My test Shop"});
      // on le recupère depuis la BDD
      const shop = await Models.Shop.findById(res.body.shop_id)

      expect(res.status).toBe(200);
      expect(shop).not.toBeNull();
      expect(res.body).toEqual(shop.dataValues);
    });
  });

})
