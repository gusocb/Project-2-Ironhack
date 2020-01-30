const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Product
const productSchema = new Schema({
  barcode: Number,
  name: String,
  price: Number,
  stock: Number
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;
