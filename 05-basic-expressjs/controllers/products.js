const path = require('path');

const Product = require('../models/product');

const rootDir = require('../utils/path');

const getAddProduct =  (req, res, next) => {
  console.log('/admin/add-product')
  res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
}

const postAddProduct = (req, res, next) => {
  console.log('/admin/product')
  console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.status(303).redirect('/shop');
}

const getProducts =  (req, res, next) => {
  console.log('/shop/')
  res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}