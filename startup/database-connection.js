const mongoose = require('mongoose');
const { winston_logger } = require('./winston_logger');
const config = require('config');

module.exports = (app) => {
  const db = config.get('db');
  mongoose
    .connect(db)
    .then(() => {
      winston_logger.info(`connected to database ${db}`);
      console.log(`connected to database ${db}`);
    })
    .catch((err) =>
      winston_logger.error('error: could not connect to database', err)
    );
};
