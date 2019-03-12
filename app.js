const express = require('express');
const http = require('http');
const Db = require('./models');

// Launch Express
const app = express();

require('./startup/logging')(app);
require('./startup/routes')(app);

// Create the server
const server = http.createServer(app);

// Server launch
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') { 
  Db.sequelize.sync().then( () => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
}

// For Jest test, don't launch server, only Db connection
// https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
if (process.env.NODE_ENV === 'test') {
    Db.sequelize.sync().then( () => {});
}

module.exports = server;