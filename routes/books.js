const express = require('express');
const router = express.Router();
const test_data = require('../test_data/books.json');

router.get('/', (req, res) => {
  return res.json(test_data);
});

module.exports = router;
