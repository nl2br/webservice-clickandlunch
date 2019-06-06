/**
 * Server configuration and launch
 */
const express = require('express');
const http = require('http');
const Db = require('./models');

// Launch Express
const app = express();

// logging and routes integration
require('./startup/logging')(app);
require('./startup/routes')(app);

// Create the server
const server = http.createServer(app);

// Server launch
const port = process.env.PORT || 3000;
// For Jest test, don't launch server, only Db connection https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testpostgres') {
  Db.sequelize.sync().then( () => {});
}else{
  Db.sequelize.sync().then( () => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
}

// socketio configuration
require('./startup/socketio')(app, server);

module.exports = server;

