const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const messageSchema = new mongoose.Schema(
  {
    sent_by: {
      type: ObjectId,
      ref: "User",
    },
    received_by: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Message", messageSchema);
