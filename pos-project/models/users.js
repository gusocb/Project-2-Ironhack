const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User
const userSchema = new Schema ({
  userName: String,
  password: String,
  role: String
});

const User = mongoose.model("User",userSchema);
module.exports = User;