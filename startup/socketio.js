/**
 * Socketio configuration
 * @params {Object} app
 * @params {Object} server
 */
module.exports = function (app, server){
  // Load socket.io
  const io = require('socket.io').listen(server, { path: '/calsocketio'});
  // list of shop and their associated socket connexion
  let vendors = [], customers = [];
  // listen on connection, and create a namespace
  const nsp = io.of('/api/v1/clickandlunch');
  // socket listener
  nsp.on('connection', function (socket) {
    nsp.emit('message', 'Vous êtes bien connecté !');
    // when a shop user register
    socket.on('register',function(shopId){
      vendors[shopId] = socket.id;
      app.set('vendors', vendors);
    });
    // when a customer user register
    socket.on('registerCustomer',function(userId){
      customers[userId] = socket.id;
      app.set('customers', customers);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  // make socketio usable in all the app
  app.set('socketio', nsp);
};


