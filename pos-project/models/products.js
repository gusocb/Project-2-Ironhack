const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Product
const productSchema = new Schema({
  barcode: String,
  name: String,
  price: String,
  stock: Number
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;
