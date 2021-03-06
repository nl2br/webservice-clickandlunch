const request = require('supertest');
const Models = require('../../models/');
const truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/users', () => {

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

  describe('api post/users', () => {

    it('Create a new customer', async () => {
      const res = await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'ttest23@test.com',
          password: 'mypassword',
          role: 'CUSTOMER'
        });
      // on le recupère depuis la BDD
      const user = await Models.User.findByPk(res.body.id);
      
      expect(res.status).toBe(201);
      expect(res.header).toHaveProperty('x-auth-token');
      expect(user).not.toBeNull();
      expect(res.body.role).toEqual(user.dataValues.role);

      // await user.destroy();
    });

    it('Create a new vendor', async () => {
      const res = await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'r@test.com',
          password: 'mypassword',
          role: 'VENDOR'
        });
      // on le recupère depuis la BDD
      const user = await Models.User.findByPk(res.body.id);
      
      expect(res.status).toBe(201);
      expect(res.header).toHaveProperty('x-auth-token');
      expect(user).not.toBeNull();
      expect(res.body.role).toEqual(user.dataValues.role);

      // await user.destroy();
    });

    it('Trying to create a new user with invalid email', async () => {
      const res = await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'ttest23test.com',
          password: 'mypassword',
          role: 'CUSTOMER'
        });

      expect(res.status).toBe(400);
      expect(res).toHaveProperty('error');
      expect(res.body.message).toBe('Validation error: Validation isEmail on email failed');

    });

  });

});