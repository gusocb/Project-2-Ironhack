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
  },
  cart:[{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
  },

  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(plm,{usernameField:'username'})
module.exports = model('User', userSchema);



