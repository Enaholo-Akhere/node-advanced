const winston = require('winston');
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const user = require('./routes/user');
const home = require('./routes/home');
const error = require('./middleware/error');
const { transports, format, createLogger } = require('winston');
const { winston_logger, winston_exceptions } = require('./utils/winston_logger');

process.on('uncaughtException', (ex) => {
  console.log('We got an uncaught exception');
  winston_exceptions.error(ex.message, ex);

});

const p = Promise.reject(new Error('failed miserably'));
p.then(() => console.log('promised caught'));

process.on('unhandledRejection', (ex) => {
  console.log('We got an unhandled rejection');
  winston_exceptions.error(ex.message, ex);
});

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/user', user);
app.use('/', home);
app.use(error);

const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT, () => {
      console.log('connected to database');
    });
  })
  .catch((err) => console.error('error: could not connect to database', err));

const env_test = process.env.NODE_ENV;
const env_test2 = app.get('env');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled');
}

console.log(`application name: ${config.get('name')}`);
// console.log(`application password: ${config.get('mail.password')}`);
// console.log(`application server: ${config.get('mail.host')}`);
