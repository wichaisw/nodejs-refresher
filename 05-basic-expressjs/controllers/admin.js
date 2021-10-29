const Product = require('../models/product');

// ANCHOR GET /admin/add-product
const getAddProduct = (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.status(200).render('admin/edit-product', { 
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,    
  });
}

// ANCHOR POST /admin/add-product
const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.status(303).redirect('/');
}

// ANCHOR GET /admin/edit-product
const getEditProduct = (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/');
    }

    res.status(200).render('admin/edit-product', { 
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  })
  
}

// ANCHOR POST /admin/edit-product
const postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(id, title, imageUrl, price, description);
  updatedProduct.save();
  res.status(303).redirect('/admin/products');
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

// ANCHOR DELETE /admin/product/:productId
const postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products')
}


module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
}