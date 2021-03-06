const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const productsFilePath = path.join(
  rootDir,
  'data',  
  'cart.json'
);

class Cart {
  static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(productsFilePath, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0}
      if(!err) {
        cart = JSON.parse(fileContent);
      }

      // find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      // add new product / increase quantity
      if(existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct]
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);
      fs.writeFile(productsFilePath, JSON.stringify(cart), (err) => {
        console.log(err)
      });
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(productsFilePath, (err, fileContent) => {
      if(err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);

      if(!product) {
        return;
      }

      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);
      
      fs.writeFile(productsFilePath, JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  }

  static getProducts(cb) {
    fs.readFile(productsFilePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);

      if(err) {
        cb(null);
      } else {
        cb(cart);
      }
    })
  }
}

module.exports = Cart;