const winston = require('../config/winston');
const morgan = require('morgan');


module.exports = function(app) {

  // crash if no config.json
  let config;

  try {
    config = require('../config/config.json');
  } catch (exc) {
    winston.error('Please provide a config.json');
    setImmediate(() => process.exit(1));
  }
  
  // crash if no NODE_ENV specified
  if(!process.env.NODE_ENV){
    winston.error('Please provide a NODE_ENV !');
    setImmediate(() => process.exit(1));
  }

  // uncaughtException error handling
  process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    setImmediate(() => process.exit(1));
  });
  
  // unhandledRejection error handling
  process.on('unhandledRejection', (ex) => {
    // if(ex.name === 'SequelizeDatabaseError'){
    //   winston.error('erreur sequelize database', ex.message);
    //   setImmediate(() => process.exit(1));
    // }
    winston.error(ex.message, ex);
    setImmediate(() => process.exit(1));
  });

  // morgan
  if(app.get('env') === 'development'){
    app.use(morgan('dev'));
    console.log('Morgan enabled ...');
  }
}