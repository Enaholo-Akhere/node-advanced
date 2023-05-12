const winston = require('winston');
const winston_logger = require('../utils/winston_logger');

module.exports = (error, req, res, next) => {
  //
  winston_logger.info(error.message);
  res.status(500).json({ message: 'user not found', success: false });
};
