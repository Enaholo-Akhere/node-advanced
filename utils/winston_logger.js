const { transports, format, createLogger } = require('winston');
const { collection } = require('../models/user');
require('winston-mongodb');

const winston_logger = createLogger({
  transports: [
    // new transports.Console({
    //      filename: 'info-logger.log',
    //     level: 'info',
    //     format: format.combine(format.timestamp(), format.json()),
    // })
    new transports.File({
      filename: 'info-logger.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: 'info',
      db: 'mongodb://localhost/playground',
      options: {
        useUnifiedTopology: true,
      },
      collection: 'server-info-data',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const winston_exceptions = createLogger({
  transports: [
    new transports.File({
      filename: 'uncaughtException.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = { winston_logger, winston_exceptions };
