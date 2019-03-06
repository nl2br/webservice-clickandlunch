let winston = require('winston');

const logTime = () => (new Date().toISOString());

let logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ 
      filename: 'error.log', 
      timestamp: logTime, 
      level: 'info',
      handleExceptions: true,
      prettyPrint:true
    }),
    // new winston.transports.File({ 
    //   filename: 'combined.log' 
    // })
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    level:'info',
    handleExceptions: true,
    prettyPrint:true,
    colorized: true
  }));
}

module.exports = logger;