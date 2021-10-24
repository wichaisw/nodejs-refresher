const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const productsFile = path.join(
  rootDir,
  'data',  
  'products.json'
);

const getProductsFromFile = callBack => {
  
}
class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // this refer to the obj created based on this class
    // products.push(this);

    // should read steeam instead if the file is quite large
    fs.readFile(productsFile, (err, fileContent) => {
      let products = [];
      if(!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(productsFile, JSON.stringify(products), err => {
        console.debug(err);
      } );
    });
  }

  // make you able to call fetchAll from the class itself without new instantiation
  static fetchAll(callBack) {
    fs.readFile(productsFile, (err, fileContent) => {
      if(err) callBack([]);

      callBack(JSON.parse(fileContent));
    })
  }
}  

module.exports = Product;

// exports.Product = Product;
// exports.products = products;