const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");
const multer = require("multer");

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var imageUpload = multer({ storage: imageStorage }).single("image");

//Post user Image
router.post("/uploadProfileImage", (req, res) => {
  imageUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

//Add user Details
router.post("/adduserdetails", requireAuth, (req, res) => {
  let userDetails = req.body;
  User.findOne({ _id: req.user._id })
    .updateOne(userDetails)
    .select("-password")
    .then(() => {
      User.findOne({ _id: req.user._id }).then((user) => {
        return res.json({ user, message: "Details added successfully" });
      });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

//Get any users details and posts
router.get("/user/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .select("-password")
    .then((user) => {
      Post.find({ posted_by: user._id })
        .populate("posted_by", "_id username profile_img")
        .sort("-createdAt")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

//Get my details
router.get("/user", requireAuth, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("-password")
    .then((user) => {
      Post.find({ posted_by: req.user._id })
        .populate("posted_by", "_id username profile_img")
        .sort("-createdAt")
        .then((posts) => {
          Like.find({ liked_by: req.user._id }).then((likes) => {
            res.json({ user, likes, posts });
          });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

//Follow User
router.put("/follow/:user_id", requireAuth, (req, res) => {
  User.findByIdAndUpdate(
    req.params.user_id,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.params.user_id },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

//Unfollow User
router.put("/unfollow/:user_id", requireAuth, (req, res) => {
  User.findByIdAndUpdate(
    req.params.user_id,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.params.user_id },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

//Search for a user
router.post("/search-users", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  User.find({ name: { $regex: userPattern } })
    .select("_id username")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
