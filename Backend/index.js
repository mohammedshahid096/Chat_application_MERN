const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { origin: "*" });

io.on("connection", (socket) => {
  console.log("connection is estalblis");

  socket.on("joined", ({ UserName }) => {
    console.log(`${UserName} : had joined the chat`);
  });
});

httpServer.listen(8000, () => {
  console.log("server is  running on : 8000");
});
