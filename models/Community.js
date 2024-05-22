const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Community Schema ***************/

const CommentSchema = new Schema({
  content: String,
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  community: {
    type: Schema.Types.ObjectId, ref: 'Community'
  },
},
  { timestamps: true }
)

const CommunitySchema = new Schema({
  communityName: String,
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
},
  { timestamps: true }
)

module.exports = mongoose.model('Community', CommunitySchema)