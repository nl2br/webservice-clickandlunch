const express = require('express');
const http = require('http');
const Db = require('./models');

// test to remove

// Launch Express
const app = express();

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
  Db.sequelize.sync({force:true}).then( () => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
}

module.exports = server;