const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
router.post('/product', productsController.postAddProduct);

module.exports = router;