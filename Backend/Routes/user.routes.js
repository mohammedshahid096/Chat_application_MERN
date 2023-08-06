const express = require("express");
const UserRoutes = express.Router();
const UserControllers = require("../Controllers/user.controller");
const singleUpload = require("../Middlewares/MulterMiddleware");
const Auth = require("../Middlewares/Authentication");

UserRoutes.route("/register").post(
  singleUpload,
  UserControllers.RegisterUserController
);
UserRoutes.route("/login").post(UserControllers.LoginUserController);
UserRoutes.route("/").get(
  Auth.authentication,
  UserControllers.SearchUserController
);
UserRoutes.route("/logout").get(UserControllers.logoutController);
UserRoutes.route("/me").get(Auth.authentication, UserControllers.UserProfile);

UserRoutes.route("/update").put(UserControllers.UpdateUserProfile);

module.exports = UserRoutes;
