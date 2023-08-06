const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DataBaseConn = require("./Config/DatabaseConn");
const indexRoutes = require("./Routes/index.routes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

// !----------------------------------------------------

// TODO : To configure the dotenv
dotenv.config({ path: "./Config/config.env" });
//
const httpServer = createServer(app);

// TODO : DataBase connection function
DataBaseConn();

// TODO : express body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO : using CookieParser
app.use(cookieParser());
app.use(cors({ origin: "*" }));

// TODO : cors config

// TODO : cloudinary conncection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETKEY,
});

// TODO : config for a socket.io
const io = new Server(httpServer, {
  origin: "*",
  // cors: { origin: "*" },
  // pingTimeout: 60000,
});
// !----------------------------------------------------

io.on("connection", (socket) => {
  // console.log("connected to socket.io successfully");

  socket.on("setup", (userData) => {
    // console.log("user joined");
    // console.log("chaterID :" + userData._id);
    socket.join(userData._id);
  });

  socket.on("join chat", (chatID) => {
    socket.join(chatID);
    // console.log("user joined room " + chatID);
  });

  // socket.on("new message", (newMessageReceived) => {
  //   // console.log(newMessageReceived);
  //   console.log(newMessageReceived);

  //   socket
  //     .in(newMessageReceived.id)
  //     .emit("message recieved", newMessageReceived);
  // });
  socket.on("new message", (newMessageReceived) => {
    console.log(newMessageReceived);

    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageReceived);
    });
  });
});

// TODO : index routes file is placed here
app.use("/api/v1/", indexRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "No Route is available with the given URL",
  });
});

// TODO for response error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

httpServer.listen(process.env.PORT || 8000, () => {
  console.log("server is running on port " + process.env.PORT || 8000);
});
