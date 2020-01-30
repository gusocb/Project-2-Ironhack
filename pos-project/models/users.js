const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User
const userSchema = new Schema ({
  username: String,
  password: String,
});

const User = mongoose.model("User",userSchema);
module.exports = User;