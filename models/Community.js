const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Community Schema ***************/

const CommentSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  content: String,
},
  { timestamps: true }
)

const CommunitySchema = new Schema({
  communityName: String,
  comments: [CommentSchema],
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
},
  { timestamps: true }
)

module.exports = mongoose.model('Community', CommunitySchema)