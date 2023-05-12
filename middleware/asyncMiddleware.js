const { trusted } = require('mongoose');
const winston_logger = require('../utils/winston_logger');

module.exports = (handle) => {
  return async (req, res, next) => {
    try {
      await handle(req, res);
      winston_logger.info(
        JSON.stringify({
          name: 'Enaholo',
          message: 'user info fetched again and again',
          isAdmin: true,
        })
      );
    } catch (ex) {
      res.status(400).json({ message: 'user not found', success: false });
      next(ex);
    }
  }; 
};
