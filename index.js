const express = require('express');
const { winston_logger } = require('./startup/winston_logger');
const app = express();

require('./startup/app-router')(app);
require('./startup/database-connection')(app);
require('./startup/logging')();
require('./startup/config')();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  winston_logger.info(`listening on port ${PORT}`);
//   console.log(`listening on port ${PORT}`);
});

module.exports = server;
