const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const likeSchema = new mongoose.Schema({
    liked_by:{
        type:ObjectId,
        ref: 'User'
    },
    liked_post:{
        type:ObjectId,
        ref: 'Post'
    }
},{timestamps:true})

mongoose.model("Like",likeSchema)