const winston = require('./config/winston');
const express = require('express');
const http = require('http');


// Launch Express
const app = express();

require('./startup/logging')(app);
require('./startup/routes')(app);



const Db = require('./models');

// Create the server
const server = http.createServer(app);

// Server launch
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') { // https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
  Db.sequelize.sync().then( () => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
}

if (process.env.NODE_ENV === 'test') {
    Db.sequelize.sync().then( () => {});
}

module.exports = server;