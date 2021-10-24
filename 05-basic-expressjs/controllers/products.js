const path = require('path');

const productData = require('../models/product');


const rootDir = require('../utils/path');

// ANCHOR /admin/add-product
const getAddProduct =  (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.status(200).render('add-product', { 
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

// ANCHOR /admin/product
const postAddProduct = (req, res, next) => {
  const product = new productData.Product(req.body.title);
  product.save();
  res.status(303).redirect('/shop');
}

// ANCHOR /shop
const getProducts =  (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = productData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop'
  });

}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}