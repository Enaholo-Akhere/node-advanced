const { winston_logger } = require('./winston_logger');
const config = require('config');

module.exports = () => {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }

  console.log(`application name: ${config.get('name')}`);
  // console.log(`application password: ${config.get('mail.password')}`);
  // console.log(`application server: ${config.get('mail.host')}`);
};
