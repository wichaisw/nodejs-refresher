const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const Cart = require('./cart');

const productsFilePath = path.join(
  rootDir,
  'data',  
  'products.json'
);

const getProductsFromFile = callBack => {
  // should read stream instead if the file is quite large
  fs.readFile(productsFilePath, (err, fileContent) => {
    if(err) {
      callBack([]);
    } else {
      callBack(JSON.parse(fileContent));
    }
  })
}

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    // this refer to the obj created based on this class
    
    getProductsFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productsFilePath, JSON.stringify(updatedProducts), err => {
          if(err) console.debug(err);
        });
      } else {
        this.id = uuidv4();
        products.push(this);
        fs.writeFile(productsFilePath, JSON.stringify(products), err => {
          if(err) console.debug(err);
        });
      }
    });
  }

  // make you able to call fetchAll from the class itself without new instantiation
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(productsFilePath, JSON.stringify(updatedProducts), err => {
        if(!err) {
          // delete product from cart too if it's no longer available
          Cart.deleteProduct(id, product.price);
        } else {
          console.debug(err);
        }
      });
    })
  }
}  

module.exports = Product;