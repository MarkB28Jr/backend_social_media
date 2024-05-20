const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** User Schema ***************/
const UserSchema = new Schema({
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