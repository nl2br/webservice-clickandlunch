const request = require('supertest');
const Models = require('../../models/');

let server;

describe('/api/v1/customers', () => {

  beforeEach(() => { server = require('../../app'); })
  afterEach(async () => { 
    await server.close(); 
    await Models.Customer.destroy({where: {}});
  });
  
  afterAll(async (done) => {
    await server.close();
    server.on('disconnected', done);
  },1000);

  describe('GET /:id', () => {
    it('Return one specific customer', async () => {
      const customer = await Models.Customer.create({first_name: 'nathan', last_name: 'lebreton'});
      const res = await request(server).get('/api/v1/customers/' + customer.get('customer_id'));
      expect(res.status).toBe(200);
      expect(res.body).toEqual(customer.dataValues);
    });
  });

  describe('PUT /:id', () => {
    it('Create user with valid data', async () => {
      const customer = await Models.Customer.create({first_name: 'nathan', last_name: 'lebreton'});
      const res = await request(server).put('/api/v1/customers/' + customer.get('customer_id'))
        .send({firstname: 'marilou'});
      const updatedCustomer = await request(server).get('/api/v1/customers/' + customer.get('customer_id'));
      expect(res.status).toBe(200);
      expect(res.body[1]).toEqual(updatedCustomer.dataValues); // WHY res.body[1] => https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    });
  });

});
