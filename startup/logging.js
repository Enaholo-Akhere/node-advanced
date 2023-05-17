const { winston_exceptions } = require('./winston_logger');

module.exports = () => {
  process.on('uncaughtException', (ex) => {
    console.log('We got an uncaught exception', ex);
    winston_exceptions.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    console.log('We got an unhandled rejection', ex);
    winston_exceptions.error(ex.message, ex);
    process.exit(1);
  });
};
