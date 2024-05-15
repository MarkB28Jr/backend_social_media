const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*************** Social / Profile / User Authiraztion Schema ***************/
const SocialSchema = new Schema({
    user: {
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
    image: [{
        type: String
    }],
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    community: {
        type: Schema.Types.ObjectId,
        ref: 'Community'
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Social", SocialSchema)
