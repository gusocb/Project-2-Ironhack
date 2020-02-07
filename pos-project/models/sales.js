const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Movements
const salesSchema = new Schema ({
  user: { type: Schema.Types.ObjectId, ref:'User'},
  movements: [{type: Schema.Types.ObjectId, ref:'Movement' }]
},
{
  timestamps: true
});

const Sale = mongoose.model("Sale",salesSchema);
module.exports = Sale;