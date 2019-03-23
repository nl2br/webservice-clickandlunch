const express = require('express');
const http = require('http');
const Db = require('./models');

// Launch Express
const app = express();


require('./startup/logging')(app);
require('./startup/routes')(app);

// // test upload and request file
// // dont forget to create the test.txt file on the root for testing
// const {uploadFile, requestFile} = require('./config/as3');
// uploadFile('test.txt');
// requestFile('test.txt');

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

module.exports = server;