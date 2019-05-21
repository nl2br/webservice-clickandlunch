const winston = require('../config/winston');
const Db = require('../models/index');

module.exports = function(err, req, res, next){

  const logTime = new Date().toISOString();

  // if (err instanceof Db.Sequelize.ConnectionError) {
  //   return res.status(503).json({
  //     type: 'SequelizeError',
  //     message: error.message
  //   });
  // }

  // if (err.name === 'SequelizeDatabaseError') {
  //   return res.status(400).json({
  //     message: err.message
  //   });
  // }

  if (err.name === 'SequelizeValidationError') {
    winston.error(`${logTime} - SequelizeValidationError - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} `);
    return res.status(400).json({
      message: err.message
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    winston.error(`${logTime} - SequelizeUniqueConstraintError - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} `);
    return res.status(400).json({
      message: err.message
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    winston.error(`${logTime} - SequelizeForeignKeyConstraintError - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} `);
    return res.status(400).json({
      message: 'Cannot add or update a child row: a foreign key constraint fails'
    });
  }
  console.log('EXPRESS HANDLER ERROR : ', err);
    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  // add this line to include winston logging
  winston.error(`${logTime} - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} `);
  return res.status(err.status).json({message: err.message});

};