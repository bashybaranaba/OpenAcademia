const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profile_img:{
        type: String,
        required: false
    },
    bio:{
        type: String,
        required: false
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
},{timestamps:true})

mongoose.model("User", userSchema)