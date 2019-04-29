
const express = require('express');
const bodyParser = require('body-parser');

// import routes
const homeRouter = require('../routes');
const productsRouter = require('../routes/products');
const shopsRouter = require('../routes/shops');
const customersRouter = require('../routes/customers');
const vendorsRouter = require('../routes/vendors');
const usersRouter = require('../routes/users');
const ordersRouter = require('../routes/orders');
const authRouter = require('../routes/auth');
const swaggerSpec = require('../swagger.js');

// handling errors
const error = require('../middleware/error');

module.exports = function (app) {
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Max-Age', '3600');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, x-access-token');
    if (req.method === 'OPTIONS') {
      console.log('TCL: req.method === OPTIONS', req);
      return res.sendStatus(200);
    }
    next();
  });

  // Router definition
  app.use('/', homeRouter);
  app.use('/api/v1/products', productsRouter);
  app.use('/api/v1/shops', shopsRouter);
  app.use('/api/v1/customers', customersRouter);
  app.use('/api/v1/vendors', vendorsRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/orders', ordersRouter);
  app.use('/api/v1/auth', authRouter);
  
  // route for swagger.json
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  // adding static folder for swagger
  app.use(express.static('public'));
  
  // default route if invalid URL input
  app.use((req, res) => {
    res.status('404').send({message: 'Wrong URL'});
  });

  // handling express error
  app.use(error);
  
};