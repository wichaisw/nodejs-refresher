// const path = require('path');

// const rootDir = require('../utils/path');
// const productData = require('../models/product');
const Product = require('../models/product');


// ANCHOR GET /products
const getProducts = (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
}

// ANCHOR GET /
const getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}

// ANCHOR GET /cart
const getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'My Cart',
    path: '/cart'
  })
}

// ANCHOR GET /checkout
const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getCheckout
}