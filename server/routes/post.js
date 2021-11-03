const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireAuth  = require('../middleware/requireAuth')
const Post =  mongoose.model("Post")
const Comment =  mongoose.model("Comment")
const Like =  mongoose.model("Like")

//get all posts
router.get('/getallposts',(req,res)=>{
    Post.find()
    .populate("posted_by","_id username")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

//Get one post and it's comments
router.get('/post/:post_id',(req,res)=>{
    Post.findOne({_id:req.params.post_id})
    .then(post=>{
        Comment.find({post_id:post._id})
        .populate("comment_by","_id username profile_img")
        .then(comments => {
            res.json({post , comments})
        })
    })
    .catch(err=>{
        return res.status(422).json({error:err})
    })
})

//Create new post
router.post('/createpost',requireAuth,(req,res)=>{
    const {title,body,image} = req.body 
    if(!title || !body){
      return  res.status(422).json({error:"Plase enter all the required fields"})
    }

    const post = new Post({
        title,
        body,
        image:image,
        posted_by:req.user._id
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Get my posts
router.get('/myposts',requireAuth,(req,res)=>{
    Post.find({posted_by:req.user._id})
    .populate("posted_by","_id name")
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Comment on Post
router.post('/myposts/:post_id',requireAuth,(req,res)=>{
    const {body} = req.body 
    if(!body){
      return  res.status(422).json({error:"Could not post empty comment"})
    }

    const comment = new Comment({
        body,
        posted_id:req.params.post_id,
        posted_by:req.user._id
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Like Post
router.get('/like/:post_id', requireAuth,(req,res)=>{
    const like = new Like({
        liked_by:req.user._id,
        liked_post:req.params.post_id
    })
    like.save()
    Post.findByIdAndUpdate(
        {_id:req.params.post_id},
        {$inc:{like_count: 1}},
        { new: true }
    )
    .then(post=>{
        res.json({post})
    })

})

//Delete post
router.delete('/deletepost/:post_id',requireAuth,(req,res)=>{
    Post.findOne({_id:req.params.post_id})
    .populate("posted_by","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.posted_by._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


module.exports = router