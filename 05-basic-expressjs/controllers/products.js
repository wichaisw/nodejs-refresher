const Product = require('../models/product');

const getAddProduct =  (req, res, next) => {
  console.log('/add-product')
  res.status(200).send('<form action="/admin/product" method="POST"><input type="text" name ="title" /><button type="submit">Send</button></form>');
}

const postAddProduct = (req, res, next) => {
  console.log('/product')
  console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.status(303).redirect('/shop');
}

const getProducts =  (req, res, next) => {
  console.log('/')
  res.status(200).send('<h1>Shop Page</h1>');
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}