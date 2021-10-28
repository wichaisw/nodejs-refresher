// const path = require('path');

// const rootDir = require('../utils/path');
// const productData = require('../models/product');
const Product = require('../models/product');
const Cart = require('../models/cart');

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

// ANCHOR GET /products/:productId
const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  })
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

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

// ANCHOR GET /orders
const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders'
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
  getOrders,
  getCheckout,
  getProduct,
  postCart
}