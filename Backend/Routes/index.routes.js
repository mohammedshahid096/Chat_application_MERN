const express = require("express");
const indexRoutes = express.Router();
const UserRoutes = require("./user.routes");
const ChatRoutes = require("./chat.routes");
const MessageRoutes = require("./message.routes");
// !-------------------------------------

indexRoutes.use("/user", UserRoutes);
indexRoutes.use("/chat", ChatRoutes);
indexRoutes.use("/message", MessageRoutes);

// !-------------------------------------

module.exports = indexRoutes;
