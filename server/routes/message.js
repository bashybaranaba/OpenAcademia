const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const Message = mongoose.model("Message");

//Send Message
router.post("/sendmessage/:receiver_id", requireAuth, (req, res) => {
  const { body } = req.body;
  if (!body) {
    return res.status(422).json({ error: "Could not send empty message" });
  }

  const message = new Message({
    body,
    sent_by: req.user._id,
    received_by: req.params.receiver_id,
  });
  message
    .save()
    .then((result) => {
      res.json({ message: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get chats
router.get("/getchats", requireAuth, (req, res) => {
  let messsages = [];
  let chats = [];
  Message.find({ sent_by: req.user._id })
    .populate("sent_by", "_id username profile_img")
    .then((sentmessages) => {
      Message.find({
        received_by: req.user._id,
      })
        .populate("sent_by", "_id username profile_img")
        .then((receivedmessages) => {
          messsages = [...sentmessages, ...receivedmessages];
          let sortedmesssages = messsages.sort(
            (a, b) => b.createdAt - a.createdAt
          );
          sortedmesssages.forEach((message) => {
            if (message.sent_by._id.toString() !== req.user._id.toString()) {
              chats = [...chats, message.sent_by];
            }
          });
          let uniquechats = [...new Set(chats)];

          res.json(uniquechats);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get Chat coversation
router.get("/getconversation/:receiver_id", requireAuth, (req, res) => {
  let conversation = [];
  Message.find({ sent_by: req.user._id, received_by: req.params.receiver_id })
    .then((sentmessages) => {
      Message.find({
        sent_by: req.params.receiver_id,
        received_by: req.user._id,
      })
        .populate("sent_by", "_id username profile_img")
        .then((receivedmessages) => {
          conversation = [...sentmessages, ...receivedmessages];
          let sortedConversation = conversation.sort(
            (a, b) => a.createdAt - b.createdAt
          );
          res.json(sortedConversation);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete message
router.delete("/deletemessage/:message_id", requireAuth, (req, res) => {
  Message.findOne({ _id: req.params.message_id })
    .populate("sent_by", "_id")
    .exec((err, message) => {
      if (err || !message) {
        return res.status(422).json({ error: err });
      }
      if (message.sent_by._id.toString() === req.user._id.toString()) {
        message
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
