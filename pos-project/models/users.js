const {model, Schema} = require('mongoose');
const plm = require('passport-local-mongoose');

//User
const userSchema = new Schema ({
  username: {
    type: String,
    unique: true
  },
  name: String,
  lastName: String,
  role:{
    type: String,
    enum: [],
    default: 'USER'
  }
},
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(plm,{usernameField:'username'})
module.exports = model('User', userSchema);



