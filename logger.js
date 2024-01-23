const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

module.exports = logger;