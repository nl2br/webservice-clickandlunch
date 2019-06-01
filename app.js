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
  Db.sequelize.sync({force:true}).then( () => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  });
}

// list of shop and their associated socket connexion
let room = [];
// listen on connection
const nsp = io.of('/api/v1/clickandlunch');
// make socketio usable in all the app
app.set('socketio', nsp);
// socket listener
nsp.on('connection', function (socket) {
  
  // nsp.to(`${socket.id}`).emit('message', 'Vous êtes bien connecté !' + socket.id);
  // console.log('Un client est connecté !', socket.id);

  socket.on('register',function(shopId){
    room[shopId] = socket.id;
    app.set('room', room);
  });

  socket.on('test', function(data){ 
    nsp.to(`${socket.id}`).emit('message', 'FUCJ'+data);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});




module.exports = server;