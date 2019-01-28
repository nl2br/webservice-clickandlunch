const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// import routes
const homeRouter = require('./routes');
const productsRouter = require('./routes/products');
const shopsRouter = require('./routes/shops');
const customersRouter = require('./routes/customers');

const Models = require('./models');

// Launch Express
const app = express();
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router definition
app.use('/', homeRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/shops', shopsRouter);
app.use('/api/v1/customers', customersRouter);
// default route if invalid URL input
app.use((req, res) => {
  res.status('404').send({message: 'Wrong URL'});
});

// Create the server
const server = http.createServer(app);

// Server launch
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') { // https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
  // Models.sequelize.sync({force:true}).then(function() {
  Models.sequelize.sync().then(function() {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
};

module.exports = server;