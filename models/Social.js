const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const SocialSchema = new Schema({
    name: String,
    email: String,
    birthday: String,
}, { timestamps: true });

module.exports = mongoose.model("Social", SocialSchema)
