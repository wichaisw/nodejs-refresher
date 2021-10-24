const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

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
  constructor(title) {
    this.title = title;
  }

  save() {
    // this refer to the obj created based on this class
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(productsFilePath, JSON.stringify(products), err => {
        console.debug(err);
      } );
    });
  }

  // make you able to call fetchAll from the class itself without new instantiation
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }
}  

module.exports = Product;