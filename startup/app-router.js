const express = require('express')
const user = require('../routes/user');
const home = require('../routes/home');
const books = require('../routes/books');
const helmet = require('helmet');
const error = require('../middleware/error')


module.exports = (app) => {
  app.set('view engine', 'pug');
  app.set('views', './views');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use('/api/user', user);
  app.use('/api/books', books);
  app.use('/', home);
  app.use(error);
};
