const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/shops', () => {

  beforeEach( async () => { 
    server = require('../../app'); 
  });
  afterEach(async () => { 
    await server.close(); 
  });
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000);

  describe('api get/shops', () => {
    beforeAll( async () =>{
      console.log('shops creation truncate');
      await truncate();
    });
    it('Listing all shop', async () => {
      console.log('shops creation');
      await Models.Shop.create({ // 189m
        name: 'Les grands gamins',    
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'atesdsqt@test5.com',
        location: {
          type: 'Point',
          coordinates: [-1.689636,48.109745],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      await Models.Shop.create({ // 102m
        name: 'oh ma biche',    
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'atesdsqt@test4.com',
        location: {
          type: 'Point',
          coordinates: [-1.687571,48.110186],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      await Models.Shop.create({ // 3.19km
        name: 'del arte',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'atesfdst@test3.com',
        location: {
          type: 'Point',
          coordinates: [-1.675866,48.083555],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      await Models.Shop.create({ // 4.56km
        name: 'lauthetik',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'atefdssdsqt@test3.com',
        location: {
          type: 'Point',
          coordinates: [-1.684577,48.152134],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      const res = await request(server).get('/api/v1/shops');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
    });
    
    it('Return all shops around 1000m of a user position', async () => {
      // distance google maps entre dereck et del arte 3,19 km (1,98 mi)
      let userPosition = {lon: -1.688121, lat: 48.111105 };

      const res = await request(server).get('/api/v1/shops?lon=' + userPosition.lon + '&lat=' + userPosition.lat);
      expect(res.body).toHaveLength(2);
    });
    
    it('Return all shops around 3500m of a user position', async () => {
      // distance google maps entre dereck et del arte 3,19 km (1,98 mi)
      let userPosition = {lon: -1.688121, lat: 48.111105 };
      let range = 3500; // meters

      const res = await request(server).get('/api/v1/shops?lon=' + userPosition.lon + '&lat=' + userPosition.lat + '&range=' + range);
      expect(res.body).toHaveLength(3);
    });

    it('Return 0 shops around 100m of a user position', async () => {
      // distance google maps entre dereck et del arte 3,19 km (1,98 mi)
      let userPosition = {lon: -1.688121, lat: 48.111105 };
      let range = 100; // meters

      const res = await request(server).get('/api/v1/shops?lon=' + userPosition.lon + '&lat=' + userPosition.lat + '&range=' + range);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('api get/shops/:id', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Get shop details for a given shop', async () => {
      const shop = await Models.Shop.create({
        name: 'Asia Shop',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'rtest45@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
      // puis on tente de récupérer les infos de ce shop
      const res = await request(server).get('/api/v1/shops/' + shop.get('shop_id'));
      expect(res.status).toBe(200);
      expect(res.body.name).toEqual(shop.dataValues.name);
    });

    it('Should send error : Get shop details for an unknow id shop', async () => {
      const res = await request(server).get('/api/v1/shops/999');
      expect(res.status).toBe(404);
      expect(res).toHaveProperty('error');
    });
  });

  describe('api get/shops/:id/products', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Listing all product items for a given shop', async () => {
      // TODO when product done
    });
  });
  
  describe('api get/shops/:shopId/products/:productId', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Get specific product for a given shop', async () => {
      // TODO when product done
    });
  });

  describe('api post/shops', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Save a shop with valid data', async () => {
      // on enregistre un nouveau shop
      const res = await request(server)
        .post('/api/v1/shops/')
        .send({
          name: 'My test Shop',
          siret: '12345678912345',
          siren: '123456789',
          phoneNumber: '0678895645',
          email: 'ttest23@test.com',
          longitude: 11,
          latitude: 9
          // location: {
          //   type: 'Point',
          //   coordinates: [11,9],
          //   crs: {type: 'name', properties: { name: 'EPSG:4326'}}
          // }
        });
      // on le recupère depuis la BDD
      const shop = await Models.Shop.findById(res.body.shop_id);

      expect(res.status).toBe(201);
      expect(shop).not.toBeNull();
      expect(res.body.name).toEqual(shop.dataValues.name);
    });

    it('Should send error : try to save shop with invalid data', async () => {
      const res = await request(server)
        .post('/api/v1/shops/')
        .send({
          name: 'My test Shop',
          siret: '123456A8912345',
          siren: '123456789',
          phoneNumber: '0678895645',
          email: 'ytest.com',
          location: {
            type: 'Point',
            coordinates: [11,9],
            crs: {type: 'name', properties: { name: 'EPSG:4326'}}
          }
        });

      expect(res.status).toBe(400);
      expect(res).toHaveProperty('error');
    });
  });

  describe('api put/shops/:id', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Modify shop with valid data', async () => {
      const shop = await Models.Shop.create({
        name: 'My Shop',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'utest1@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });

      const res = await request(server)
        .put('/api/v1/shops/' + shop.get('shop_id'))
        .send({name: 'your shop'});

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('your shop');
    });

    it('Modify shop with valid data AND lon and lat', async () => {
      const shop = await Models.Shop.create({
        name: 'My Shop',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'itest2@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });

      const res = await request(server)
        .put('/api/v1/shops/' + shop.get('shop_id'))
        .send({
          name: 'your shop',
          longitude: 56,
          latitude: 78
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('your shop');
    });

    it('Should report error : Modify shop with invalid data', async () => {
      const shop = await Models.Shop.create({
        name: 'valid Shop',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'otest3@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });

      const res = await request(server)
        .put('/api/v1/shops/' + shop.get('shop_id'))
        .send({
          name: 'unvalid \'Shop',
          siret: '1234567891234A',
          siren: '1234567898',
          phone_number: '9678895645',
          email: 'ptest.com',
          location: {
            type: 'Point',
            coordinates: [200,9],
            crs: {type: 'name', properties: { name: 'EPSG:4326'}}
          }
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Error while trying to update the shop');
    });

    it('Should report error : Modify shop with a not existing id', async () => {
      const res = await request(server)
        .put('/api/v1/shops/999')
        .send({name: 'unvalid Shop'});

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('this shop don\'t exist');
    });
  });

  describe('api delete/shops/:id', () => {
    beforeAll( async () =>{
      await truncate();
    });
    it('Delete shop with a given id', async () => {
      const shop = await Models.Shop.create({
        name: 'My Shoppp',
        siret: '12345678912345',
        siren: '123456789',
        phone_number: '0678895645',
        email: 'qtest7@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });

      const res = await request(server)
        .delete('/api/v1/shops/' + shop.get('shop_id'))
        .send({deleted: 1});

      expect(res.status).toBe(200);
      expect(res.body.deleted).toBe(true);
    });

    it('Should send error : Get shop details for a not existing shop', async () => {
      const res = await request(server).delete('/api/v1/shops/999');
      expect(res.status).toBe(404);
      expect(res).toHaveProperty('error');
      expect(res.body.message).toBe('this shop don\'t exist');
    });

  });

});