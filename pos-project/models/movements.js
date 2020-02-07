const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Movements
const movementSchema = new Schema ({
  quantity: { type: Number },
  product: { type: Schema.Types.ObjectId, ref:'Product'}
},
{
  timestamps: true
});

const Movement = mongoose.model("Movement",movementSchema);
module.exports = Movement;