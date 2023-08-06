import React, { useEffect } from "react";
import { UserName } from "./Join";
import socketIO from "socket.io-client";

// const ENDPOINT = "ws://localhost:8000";
const ENDPOINT = "http://localhost:8000";

const Chat = () => {
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      alert("connected");
    });

    socket.emit("joined", { UserName });
    return () => {
      //   alert("logotu");
    };
  }, [socket]);

  return <div>{UserName}</div>;
};

export default Chat;
