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
      const customer = await Models.Customer.create({firstname: 'nathan', lastname: 'lebreton'});
      const res = await request(server).get('/api/v1/customers/' + customer.get('customerId'));
      expect(res.status).toBe(200);
      expect(res.body.lastname).toEqual(customer.dataValues.lastname);
    });
  });

  describe('PUT customers/:id', () => {

    it('Modify user with valid data', async () => {
      const customer = await Models.Customer.create({firstname: 'sabrina', lastname: 'lebreton'});

      const res = await request(server)
        .put('/api/v1/customers/' + customer.get('customerId'))
        .send({firstname: 'marilou'});

      // console.log('TESTTTT:', res.body)

      expect(res.status).toBe(200);
      expect(res.body.firstname).toBe('marilou');
      // const updatedCustomer = await request(server).get('/api/v1/customers/' + customer.get('customerId'));
      // expect(res.body[1]).toEqual(updatedCustomer.dataValues); // WHY res.body[1] => https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    });
  });

});
