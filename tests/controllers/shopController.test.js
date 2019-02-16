const Models = require('../../models/');
const truncate = require('../truncate');
let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/shops', () => {

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

  test('shop : return 2 products', async () => {
    let shop = await Models.Shop.create({
      name: 'Armenian Shop',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test7.com',
      location: {
        type: 'Point',
        coordinates: [11,9],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
      
    const product1 = await Models.Product.create({name: 'kumkuat', price: '9.90', shop_id: shop.get('shop_id') });
    const product2 = await Models.Product.create({name: 'kumkuat 2', price: '9.90', shop_id: shop.get('shop_id') });
    shop.setProducts([product1,product2]);
    shop.getProducts();
    console.log('SHOPPPPP',shop);
    // expect(shop.length).toBe(2);
    // await Models.Product.destroy({where: {}})
    // .catch(error => {
    //   console.log('error destroy shop : ', error.message);
    //   // return res.status(400).send(error);
    // });
  });
  
  test('shop : return nearby shop around point', async () => {
  
    let shop = await Models.Shop.create({
      name: 'cafe', 
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test6.com',
      location: {
        type: 'Point',
        email: 'test@test.com',
        coordinates: [11,2],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'shop',    
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test5.com',
      location: {
        type: 'Point',
        coordinates: [2,2],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'cloth',    
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test4.com',
      location: {
        type: 'Point',
        coordinates: [5,4],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'restaurant',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test3.com',
      location: {
        type: 'Point',
        coordinates: [8,7],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'cafe 2',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test2.com',
      location: {
        type: 'Point',
        coordinates: [3,9],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'toy',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'test@test1.com',
      location: {
        type: 'Point',
        coordinates: [11,9],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
  
    let customerPosition = {lon: 9, lat: 4};
    let radius = 10;
    await shop.findNearbyShops(customerPosition.lon,customerPosition.lat, radius)
      .then(shops => {
        console.log('Shops aux alentours :',shops); 
        console.log('Shops aux alentours :',shops); 
        console.log('Shops aux alentours :',shops); 
        expect(shops.length).toBe(3);
      })
      .catch(error => {
        console.log('error findNearbyShops : ', error.message);
      });
  
  });
  test('shop : return nearby shop around dereck', async () => {
  
    let shop = await Models.Shop.create({
      name: 'cafe', 
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'tfdsest@test6.com',
      location: {
        type: 'Point',
        email: 'test@test.com',
        coordinates: [11,2],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({
      name: 'Les grands gamins',    
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'tesdsqt@test5.com',
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
      email: 'tesdsqt@test4.com',
      location: {
        type: 'Point',
        coordinates: [-1.687571,48.110186],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    await Models.Shop.create({ // 3.19 km
      name: 'del arte',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'tesfdst@test3.com',
      location: {
        type: 'Point',
        coordinates: [-1.675866,48.083555],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    
    await Models.Shop.create({ // 4.56 km
      name: 'lauthetik',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: '0678895645',
      email: 'tefdssdsqt@test3.com',
      location: {
        type: 'Point',
        coordinates: [-1.684577,48.152134],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
  
    // distance google maps entre dereck et del arte 3,19 km (1,98 mi)
    let customerPosition = {lon: -1.688121, lat: 48.111105 };
    let radius = 1000; // meters
    await shop.findNearbyShops(customerPosition.lon,customerPosition.lat, radius)
      .then(shops => {
        console.log('Shops aux alentours :',shops); 
        expect(shops.length).toBe(2);
      })
      .catch(error => {
        console.log('error findNearbyShops : ', error.message);
      });
  
  });

  test('shop : return error', async () => {
    let shop = await Models.Shop.build({
      name: 'toy',
      siret: '12345678912345',
      siren: '123456789',
      phone_number: 'rere',
      email: 'test@test.com',
      location: {
        type: 'Point',
        coordinates: [11,9],
        crs: {type: 'name', properties: { name: 'EPSG:4326'}}
      }
    });
    return shop.validate()
      .catch(errors => {
        expect(errors).toHaveProperty('errors');
      });

  });
});

