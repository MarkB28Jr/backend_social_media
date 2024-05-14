const mongoose = require('mongoose')
const Schema = mongoose.Schema
 

// const MessagingSchema = new Schema({
//     title: String,
//     name: String,
//     username: String,
//     content: String,
//     // date: Date,
// },
// { timestamps: true }
// )

// const CommunitySchema = new Schema ({
//     communityName: String,
//     email: String,
//     username: String,
//     content: String,
// },
// { timestamps: true })

// const ProfileSchema = new Schema ({
//     profileName: String,
//     email: String,
//     username: String,
//     age: String,
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'other']
//     },
//     image:[{
//         type: String
//     }],
// },
// { timestamps: true })

const SocialSchema = new Schema({
    name: String,
    email: String,
    birthday: String,
    username: String,
    // message: {MessagingSchema},
    // community: {CommunitySchema},
    // profile: {ProfileSchema},
},
{ timestamps: true });

module.exports = mongoose.model("Social", SocialSchema)
