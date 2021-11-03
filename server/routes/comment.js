const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireAuth  = require('../middleware/requireAuth')
const Comment =  mongoose.model("Comment")

//Comment on Post
router.post('/comment/:post_id',requireAuth,(req,res)=>{
    const {body} = req.body 
    if(!body){
      return  res.status(422).json({error:"Could not post empty comment"})
    }

    const comment = new Comment({
        body,
        post_id:req.params.post_id,
        comment_by:req.user._id
    })
    comment.save().then(result=>{
        res.json({comment:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Delete comment
router.delete('/deletecomment/:comment_id',requireAuth,(req,res)=>{
    Comment.findOne({_id:req.params.comment_id})
    .populate("comment_by","_id")
    .exec((err,comment)=>{
        if(err || !comment){
            return res.status(422).json({error:err})
        }
        if(comment.comment_by._id.toString() === req.user._id.toString()){
              comment.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


module.exports = router