const express = require('express');
const router = express.Router();
const test_data = require('../test_data/books.json');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  return res.json(test_data);
});

router.post(
  '/',
  [
    check('name', 'Book name is required').not().isEmpty(),
    check('author', 'Author name is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
  }
);

module.exports = router;
