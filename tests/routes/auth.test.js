const request = require('supertest');
const truncate = require('../truncate');

let server;

beforeAll( async () =>{
  await truncate();
});

describe('/api/v1/auth', () => {

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

  describe('api post/auth', () => {

    it('user is authenticate', async () => {
      // create the user
      await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'a@a.com',
          password: 'mypassword',
          role: 'CUSTOMER'
        });

      const res = await request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'a@a.com',
          password: 'mypassword'
        });

      expect(res.body.message).toBe('Authentication successful!');

    });

    it('user is not authenticate cause bad password', async () => {
      // create the user
      await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'b@b.com',
          password: 'mypassword',
          role: 'CUSTOMER'          
        });

      const res = await request(server)
        .post('/api/v1/auth/login/')
        .send({
          email: 'b@b.com',
          password: 'myFailPassword'
        });

      expect(res.body.message).toBe('invalid login or password');
    });

    it('user is not authenticate cause bad email', async () => {
      // create the user
      await request(server)
        .post('/api/v1/users/')
        .send({
          firstname: 'nathan',
          lastname: 'lebreton',
          phoneNumber: '0678895645',
          email: 'c@c.com',
          password: 'mypassword',
          role: 'CUSTOMER'
        });

      const res = await request(server)
        .post('/api/v1/auth/login/')
        .send({
          email: 'a@b.com',
          password: 'mypassword'
        });

      expect(res.body.message).toBe('invalid login or password');
    });

  });

});