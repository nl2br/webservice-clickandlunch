const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/customers', () => {

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

  describe('GET customers/:id', () => {

    it('Return one specific customer', async () => {
      // create the user
      const user = await Models.User.create({
        firstname: 'nathan', 
        lastname: 'lebreton',
        phoneNumber: '0636697845',
        email: 'hssa@ha.com',
        password: 'password',
        role: 'CUSTOMER'
      });

      let userId = user.get('id');
      let token = user.generateAuthToken();

      // assocaite the user to the customer table
      await Models.Customer.create({
        id: userId
      });

      const res = await request(server).get('/api/v1/customers/' + userId).set('x-auth-token', token);

      expect(res.status).toBe(200);
      expect(res.body.lastname).toEqual(user.get('lastname'));
    });
  });

  describe('PUT customers/:id', () => {

    it('Modify user with valid data', async () => {
      const user = await Models.User.create({
        firstname: 'sabrina', 
        lastname: 'lebreton',
        phoneNumber: '0636697845',
        email: 'j@j.com',
        password: 'password',
        role: 'CUSTOMER'
      });
      await Models.Customer.create({
        id: user.get('id')
      });
      
      let token = user.generateAuthToken();

      const res = await request(server)
        .put('/api/v1/customers/' + user.get('id'))
        .set('x-auth-token', token)
        .send({firstname: 'marilou'});

      expect(res.status).toBe(200);
      expect(res.body.firstname).toBe('marilou');
    });
  });

});
