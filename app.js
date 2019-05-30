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

// Load socket.io
const io = require('socket.io').listen(server, { path: '/calsocketio'});

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

// listen on connection
const nsp = io.of('/api/v1/clickandlunch');
nsp.on('connection', function (socket) {
  console.log('Un client est connecté !', socket.id);
  nsp.emit('message', 'Vous êtes bien connecté !');
  socket.on('test', function(data){ 
    nsp.emit('message', 'FUCJ'+data);
  });
});

module.exports = server;