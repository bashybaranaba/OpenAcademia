const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    posted_by:{
        type:ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: false
    },
    body:{
        type:String,
        required:true
    },
    files:{
        type: Array,
        default:[]
    },
    like_count: {
        type: Number,
        default: 0
    }
},{timestamps:true})

mongoose.model("Post",postSchema)