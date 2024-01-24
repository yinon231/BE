const winston = require('winston');

const logSuccess = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'success.log',
      level: 'info',
      levelFilter: (level, message, metadata) => level === 'info'
    }),
  ],
});
const logError = winston.createLogger({
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        levelFilter: (level, message, metadata) => !message.includes('Received request')
      }),
    ],
  });

module.exports = { logSuccess, logError };