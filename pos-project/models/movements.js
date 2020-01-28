const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Movements
const movementSchema = new Schema ({
  product: String,
  inDate: Date,
  outDate: Date
});

const Movement = mongoose.model("Movement",movementSchema);
module.exports = Movement;