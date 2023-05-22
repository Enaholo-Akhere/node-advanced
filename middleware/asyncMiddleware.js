const { winston_logger } = require('../startup/winston_logger');

module.exports = (handle) => {
  return async (req, res, next) => {
    try {
      await handle(req, res);
      winston_logger.info('operation done');
    } catch (ex) {
      next(ex);
    }
  };
};
