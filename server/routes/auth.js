const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signup", (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(422).json({ error: "Please add all fields" });
  }
  User.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "A user with that email already exists" });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new User({
        first_name,
        last_name,
        username,
        email,
        password: hashedpassword,
      });
      user
        .save()
        .then(() => {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          res.json({ message: "successfully signed up", token });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter all fields" });
  }
  User.findOne({ email: email }).then((existingUser) => {
    if (!existingUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, existingUser.password)
      .then((doesMatch) => {
        if (doesMatch) {
          const token = jwt.sign({ _id: existingUser._id }, JWT_SECRET);
          res.json({ message: "successfully signed in", token });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
