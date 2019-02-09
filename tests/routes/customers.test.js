const request = require('supertest');
const Models = require('../../models/');
truncate = require('../truncate');

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
      const customer = await Models.Customer.create({first_name: 'nathan', last_name: 'lebreton'});
      const res = await request(server).get('/api/v1/customers/' + customer.get('customer_id'));
      expect(res.status).toBe(200);
      expect(res.body.last_name).toEqual(customer.dataValues.last_name);
    });
  });

  describe('PUT customers/:id', () => {
    it('Modify user with valid data', async () => {
      const customer = await Models.Customer.create({first_name: 'sabrina', last_name: 'lebreton'});

      const res = await request(server)
        .put('/api/v1/customers/' + customer.get('customer_id'))
        .send({firstname: 'marilou'});

      // console.log('TESTTTT:', res.body)

      expect(res.status).toBe(200);
      expect(res.body.first_name).toBe('marilou');
      // const updatedCustomer = await request(server).get('/api/v1/customers/' + customer.get('customer_id'));
      // expect(res.body[1]).toEqual(updatedCustomer.dataValues); // WHY res.body[1] => https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    });
  });

});
