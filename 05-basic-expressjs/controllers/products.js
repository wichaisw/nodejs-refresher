// const path = require('path');

// const rootDir = require('../utils/path');
// const productData = require('../models/product');
const Product = require('../models/product');



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
  const product = new Product(req.body.title);
  product.save();
  res.status(303).redirect('/');
}

// ANCHOR /shop
const getProducts =  (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}