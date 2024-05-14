const mongoose = require('mongoose')
const Schema = mongoose.Schema
 

const MessagingSchema = new Schema({
    title: String,
    name: String,
    username: String,
    content: String,
    // date: Date,
},
{ timestamps: true }
)

const CommunitySchema = new Schema ({
    communityName: String,
    email: String,
    username: String,
    content: String,
},
{ timestamps: true })

const SocialSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    profileName: String,
    age: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    image:[{
        type: String
    }],
    message: {MessagingSchema},
    community: {CommunitySchema},
},
{ timestamps: true });

module.exports = mongoose.model("Social", SocialSchema)
