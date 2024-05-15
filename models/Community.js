const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social Community Schema ***************/
const CommunitySchema = new Schema({
  communityName: String,
  email: String,
  username: String,
  content: String,
},
{ timestamps: true }
)

module.exports = mongoose.model('Community', CommunitySchema)