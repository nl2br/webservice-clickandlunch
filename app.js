const express = require('express');
const http = require('http');

// import routes
const homeRouter = require('./routes');
const productsRouter = require('./routes/products');
const shopsRouter = require('./routes/shops');
const customersRouter = require('./routes/customers');

// Launch Express
const app = express();
app.use(express.json());

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
  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}
module.exports = server;

