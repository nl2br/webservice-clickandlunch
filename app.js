const express = require('express');
const http = require('http');

// import models
const models = require('./models');

// import routes
const homeRouter = require('./routes');
const productsRouter = require('./routes/products');
const shopsRouter = require('./routes/shops');

// Launch Express
const app = express();
app.use(express.json());

// Router definition
app.use('/', homeRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/shops', shopsRouter);
// default route if invalid URL input
app.use((req, res) => {
  res.status('404').send({message: 'Wrong URL'});
});

// Create the server
const server = http.createServer(app);

// Server launch
const port = process.env.PORT || 3000;

// // Sync models with database only if database doesn't exist
// models.sequelize.sync()
//   .then( () => {
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
  // })
  // .catch(err => {
  //   console.log(err, "Error with Sequelize database")
  // });
