const Product = require('../models/product');

// ANCHOR GET /admin/add-product
const getAddProduct = (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.status(200).render('admin/add-product', { 
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

// ANCHOR POST /admin/add-product
const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.status(303).redirect('/');
}

// ANCHOR GET /admin/products
const getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}


module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
}