const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const Like = mongoose.model("Like");
const multer = require("multer");

var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_*${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, true);
  },
});

var fileUpload = multer({ storage: fileStorage }).single("file");

router.post("/uploadFile", (req, res) => {
  fileUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      file: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

//get all posts
router.get("/getallposts", (req, res) => {
  Post.find()
    .populate("posted_by", "_id username profile_img")
    .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get one post and it's comments
router.get("/post/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("posted_by", "_id username profile_img")
    .then((post) => {
      Comment.find({ post_id: req.params.postId })
        .populate("comment_by", "_id username profile_img")
        .then((comments) => {
          res.json({ post, comments });
        });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

//Create new post
router.post("/createpost", requireAuth, (req, res) => {
  const { title, body, image } = req.body;
  if (!title || !body) {
    return res
      .status(422)
      .json({ error: "Plase enter all the required fields" });
  }

  const post = new Post({
    title,
    body,
    image: image,
    posted_by: req.user._id,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get my posts
router.get("/myposts", requireAuth, (req, res) => {
  Post.find({ posted_by: req.user._id })
    .populate("posted_by", "_id username")
    .then((myposts) => {
      res.json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Like Post
router.get("/like/:post_id", requireAuth, (req, res) => {
  const like = new Like({
    liked_by: req.user._id,
    liked_post: req.params.post_id,
  });
  like.save().then((like) => {
    Post.findByIdAndUpdate(
      { _id: req.params.post_id },
      { $inc: { like_count: 1 } },
      { new: true }
    ).then(() => {
      res.json({ like });
    });
  });
});

//Unlike Post
router.get("/unlike/:post_id", requireAuth, (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.post_id },
    { $inc: { like_count: -1 } },
    { new: true }
  ).then((post) => {
    Like.findOne({ liked_post: req.params.post_id, liked_by: req.user._id })
      .populate("liked_by", "_id")
      .exec((err, like) => {
        if (err || !like) {
          return res.status(422).json({ error: err });
        }
        like
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
});

//Delete post
router.delete("/deletepost/:post_id", requireAuth, (req, res) => {
  Post.findOne({ _id: req.params.post_id })
    .populate("posted_by", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.posted_by._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
