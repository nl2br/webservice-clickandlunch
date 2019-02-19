const Models = require('../../models/');
const truncate = require('../truncate');
let server;

beforeAll( async () =>{
  console.log('truncate beforeall');
  await truncate();
});

describe('shopController', () => {

  beforeEach(async () => { 
    server = require('../../app'); 
  });
  afterEach(async () => { 
    console.log('truncate aftereach');
    await truncate();
    await server.close(); 
  });
  
  afterAll(async (done) => {
    await truncate();
    await server.close();
    server.on('disconnected', done);
  },1000);

  test('shop : return 2 products', async () => {
    let shop = await Models.Shop.create({
      name: 'Armenian Shop',
      siret: '12345678912345',
      siren: '123456789',
      phoneNumber: '0678895645',
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
    // expect(shop.length).toBe(2);
    // await Models.Product.destroy({where: {}})
    // .catch(error => {
    //   console.log('error destroy shop : ', error.message);
    //   // return res.status(400).send(error);
    // });
  });
  
  test('shop : return error', async () => {
    let shop = await Models.Shop.build({
      name: 'toy',
      siret: '12345678912345',
      siren: '123456789',
      phoneNumber: 'rere',
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

