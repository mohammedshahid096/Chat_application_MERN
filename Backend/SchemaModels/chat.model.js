const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "usercollections",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "messagecollections",
    },
    groupAdmin: {
      type: mongoose.Schema.ObjectId,
      ref: "usercollections",
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chatscollections", ModelSchema);

module.exports = ChatModel;
