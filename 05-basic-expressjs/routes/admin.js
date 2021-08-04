const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('/add-product')
  res.status(200).send('<form action="/admin/product" method="POST"><input type="text" name ="title" /><button type="submit">Send</button></form>');
});

router.post('/product', (req, res, next) => {
  console.log('/product')
  console.log(req.body);
  res.status(303).redirect('/shop');
});

module.exports = router;