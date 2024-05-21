const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** User Schema ***************/
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required:true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required:true,
  }
},
  { timestamps: true });

module.exports = mongoose.model("User", UserSchema)