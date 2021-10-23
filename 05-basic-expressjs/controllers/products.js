const path = require('path');

const Product = require('../models/product');

const rootDir = require('../utils/path');

// ANCHOR /admin/add-product
const getAddProduct =  (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

// ANCHOR /admin/product
const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.status(303).redirect('/shop');
}

// ANCHOR /shop
const getProducts =  (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}