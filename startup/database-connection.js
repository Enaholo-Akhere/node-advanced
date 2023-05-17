const mongoose = require('mongoose');
const { winston_logger } = require('./winston_logger');

module.exports = (app) => {
  const PORT = process.env.PORT || 5000;

  mongoose
    .connect('mongodb://localhost/playground')
    .then(() => {
      winston_logger.info(`listening on port ${PORT}`);
      app.listen(PORT, () => {
        winston_logger.info('connected to database');
      });
    })
    .catch((err) =>
      winston_logger.error('error: could not connect to database', err)
    );
};
