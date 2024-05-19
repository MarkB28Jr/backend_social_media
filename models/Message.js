const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Message Schema ***************/
const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: String,
  content: String,
  file: String,
},
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)