const {
  winston_logger,
  winston_exceptions,
} = require('../startup/winston_logger');

module.exports = (error, req, res, next) => {
  //
  console.log('error is here', error);
  winston_exceptions.error(error.message, error);
};
