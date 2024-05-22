const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** User Schema ***************/
const ProfileSchema = new Schema({
  profileName: String,
  age: String,
  gender: {
      type: String,
  },
  image: {
      type: String
  }
},
  { timestamps: true })

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  profile: ProfileSchema
},
  { timestamps: true })

module.exports = mongoose.model("User", UserSchema)