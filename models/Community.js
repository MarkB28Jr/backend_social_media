const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Community Schema ***************/
const CommunitySchema = new Schema({
  communityName: String,
  username: String,
  content: String,
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
},
},
{ timestamps: true }
)

module.exports = mongoose.model('Community', CommunitySchema)