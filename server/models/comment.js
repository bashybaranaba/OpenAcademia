const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const commentSchema = new mongoose.Schema({
    comment_by:{
        type:ObjectId,
        ref: 'User'
    },
    post_id:{
        type:ObjectId,
        ref: 'Post'
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Comment",commentSchema)