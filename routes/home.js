const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'world', message: 'my first pug program' });
});

module.exports = router;
