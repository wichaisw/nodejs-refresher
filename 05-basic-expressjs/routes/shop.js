const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('/')
  res.status(200).send('<h1>From Express</h1>');
});

module.exports = router;