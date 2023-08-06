const express = require("express");
const ChatRoutes = express.Router();
const Auth = require("../Middlewares/Authentication");
const ChatController = require("../Controllers/chat.controller");

ChatRoutes.route("/")
  .get(Auth.authentication, ChatController.fetchChatController)
  .post(Auth.authentication, ChatController.AccessChat);

ChatRoutes.route("/group").post(
  Auth.authentication,
  ChatController.createGroupChatController
);
ChatRoutes.route("/group/rename").put(
  Auth.authentication,
  ChatController.RenameGroupController
);
ChatRoutes.route("/group/adduser").put(
  Auth.authentication,
  ChatController.AddUserinGroupController
);
ChatRoutes.route("/group/removeuser").put(
  Auth.authentication,
  ChatController.RemoveUserinGroupController
);

module.exports = ChatRoutes;
