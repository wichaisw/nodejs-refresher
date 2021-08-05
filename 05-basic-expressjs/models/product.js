const products = [];

class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // this refer to the obj created based on this class
    products.push(this);
  }

  // make you able to call fetchAll from the class itself without new instantiation
  static fetchAll() {
    return products;
  }
}  

module.exports = {
  Product
}