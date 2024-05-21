const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** User Schema ***************/
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
},
  { timestamps: true });

module.exports = mongoose.model("User", UserSchema)