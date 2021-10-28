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
        updatedProduct.qty = Number(updatedProduct.qty) + 1;
        cart.products = [...cart.products];
        cart.products[existingProduct] = updatedProduct;
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
}

module.exports = Cart;