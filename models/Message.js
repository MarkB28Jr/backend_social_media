const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Message Schema ***************/
const MessageSchema = new Schema({
  title: String,
  name: String,
  username: String,
  content: String,
  // date: Date,
},
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)