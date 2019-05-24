const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;
let token; // declare the token variable in a scope accessible by the entire test suite
let shopGlobal;

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
      // await truncate();
    });

    it('get specific product of type DISH', async () => {
      const shop = await Models.Shop.create({
        name: 'Restaurant test',
        address: '12 allée des palmiers',
        city: 'Rennes',
        postalCode: '35000', 
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
        id: shop.get('id')
      });

      const res = await request(server).get('/api/v1/products/' + p.get('id'));

      // on le recupère depuis la BDD
      const newProduct = await Models.Product.findById(p.get('id'));

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
        address: '12 allée des palmiers',
        city: 'Rennes',
        postalCode: '35000', 
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
        shopId: shop.get('id')
      });
      const p2 = await Models.Product.create({
        name: 'poulet roti',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shop.get('id')
      });
      const menu = await Models.Product.create({
        name: 'menu salade chevre poulet roti',
        description: 'description',
        price: '4.90',
        productType: 'MENU',
        shopId: shop.get('id')
      });
      await Models.Menu.create({
        menuId: menu.get('id'),
        productId: p1.get('id')
      });
      await Models.Menu.create({
        menuId: menu.get('id'),
        productId: p2.get('id')
      });
      const res = await request(server).get('/api/v1/products/' +  menu.get('id') );
      expect(res.status).toBe(200);
    });
  });

  describe('POST products/', () => {
    beforeAll( async () => {
      await truncate();
      shopGlobal = await Models.Shop.create({
        name: 'Restaurant test',
        address: '12 allée des palmiers',
        city: 'Rennes',
        postalCode: '35000', 
        siret: '12345678912345',
        siren: '123456789',
        phoneNumber: '0678895645',
        email: 'yuyu@test.com',
        location: {
          type: 'Point',
          coordinates: [11,9],
          crs: {type: 'name', properties: { name: 'EPSG:4326'}}
        }
      });
    });

    beforeEach( async () => {
      let user = new Models.User();
      user.role = 'VENDOR';
      token = user.generateAuthToken();
    });

    afterAll( async () => {
      // await truncate();
    });

    it('Save a product with valid data', async () => {
      
      const res = await request(server)
        .post('/api/v1/products/shops/' + shopGlobal.get('id'))
        .set('x-auth-token', token)
        .send({
          name: 'product test 2',
          description: 'description product test',
          price: '9.90',
          productType: 'DISH'
        });
      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.id);

      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });

    it('Save a product with multiple photos', async () => {
      jest.setTimeout(30000);
      // upload the file
      const img1 = `${__dirname}/../test_files/plathiver.jpg`;
      const img2 = `${__dirname}/../test_files/salade.png`;
      const img3 = `${__dirname}/../test_files/poulet-roti-pommes.jpg`;

      const res = await request(server)
        .post('/api/v1/products/shops/' + shopGlobal.get('id'))
        .set('x-auth-token', token)
        .attach('file', img1)
        .attach('file', img2)
        .attach('file', img3)
        .field('name','product test 2')
        .field('description','description product test')
        .field('price','9.90')
        .field('productType','DISH');
        
      console.log('TCL: res.body', res.body);

      // on le recupère depuis la BDD
      const product = await Models.Product.findById(res.body.id);

      console.log('TCL: product', product);
      expect(res.status).toBe(201);
      expect(product).not.toBeNull();
      expect(res.body.name).toEqual(product.dataValues.name);
    });

    it('Save a product menu type', async () => {

      const p1 = await Models.Product.create({
        name: 'salade',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shopGlobal.get('id')
      });
      const p2 = await Models.Product.create({
        name: 'poulet',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shopGlobal.get('id')
      });
      const p3 = await Models.Product.create({
        name: 'frite',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shopGlobal.get('id')
      });

      const res = await request(server)
        .post('/api/v1/products/menus/shops/' + shopGlobal.get('id'))
        .set('x-auth-token', token)
        .send({
          name: 'menu salade poulet frite',
          description: 'description product test',
          price: '9.90',
          listProducts: [p1.get('id'), p2.get('id'), p3.get('id')]
        });
      console.log('TCL: res.body', res.body);
      // on le recupère depuis la BDD
      const menu = await Models.Product.findByPk( res.body.id,
        {include:{ model: Models.Product, through: 'Menu', as: 'products'}}
      );

      
      // console.log('menuuuuuuu', menu);
      // menu.dataValues.products.forEach(product => {
      //   console.log('product', product);
      // });
      
      // console.log('menuuuuuuu JSON', menu.toJSON());

      // let products = await menu.getProducts();
      // console.log('productsssss', products);

      // const menu2 = await Models.Product.findByPk( p3.get('productId'),
      //   {include:{ model: Models.Product, through: 'Menu', as: 'products'}}
      // );
      // let countMenus = await menu2.countMenus();
      // console.log('countMenus', countMenus);

      // let menuss = await menu2.getMenus();
      // console.log('menusssssss', menuss);

      expect(res.status).toBe(201);
      expect(menu).not.toBeNull();
      expect(res.body.name).toEqual(menu.dataValues.name);
    });


    it('Save a product menu type with photo', async () => {
      jest.setTimeout(30000);
      // upload the file
      const img1 = `${__dirname}/../test_files/plathiver.jpg`;
      const img2 = `${__dirname}/../test_files/plats1.jpg`;
      const img3 = `${__dirname}/../test_files/poulet-roti-pommes.jpg`;

      const p1 = await Models.Product.create({
        name: 'salade',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shopGlobal.get('id')
      });
      
      const p2 = await Models.Product.create({
        name: 'poulet',
        description: 'description',
        price: '4.90',
        productType: 'DISH',
        shopId: shopGlobal.get('id')
      });

      const res = await request(server)
        .post('/api/v1/products/menus/shops/' + shopGlobal.get('id'))
        .set('x-auth-token', token)
        .attach('file', img1)
        .attach('file', img2)
        .attach('file', img3)
        .field('name','menu salade poulet frite')
        .field('description','description product test')
        .field('price','9.90')
        .field('listProducts',[p1.get('id'), p2.get('id')]);

      // on le recupère depuis la BDD
      const menu = await Models.Product.findByPk( res.body.id,
        {include:{ model: Models.Product, through: 'Menu', as: 'products'}}
      );

      expect(res.status).toBe(201);
      expect(menu).not.toBeNull();
      expect(res.body.name).toEqual(menu.dataValues.name);
    });
  });


});

