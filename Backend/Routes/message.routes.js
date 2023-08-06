const express = require("express");
const MessageRoutes = express.Router();
const Auth = require("../Middlewares/Authentication");
const MessageController = require("../Controllers/message.controller");

MessageRoutes.route("/").post(
  Auth.authentication,
  MessageController.SendMessage
);
MessageRoutes.route("/:chatId").get(
  Auth.authentication,
  MessageController.AllMesssages
);

module.exports = MessageRoutes;
