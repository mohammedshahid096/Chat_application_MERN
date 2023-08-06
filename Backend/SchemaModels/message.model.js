const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "usercollections",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "chatscollections",
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("messagecollections", ModelSchema);

module.exports = MessageModel;
