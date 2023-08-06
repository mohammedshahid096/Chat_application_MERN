import React from "react";
import "./ChatBox.css";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Message from "./Message";

const ChatBox = () => {
  const { selectedUser } = useSelector((state) => state.SelectedUser);
  return (
    <div
      className={
        selectedUser
          ? "ChatBoxWrapper showMessages"
          : "ChatBoxWrapper hideMessages"
      }
    >
      {selectedUser ? <Message /> : <NoUserSelected />}
    </div>
  );
};

const NoUserSelected = () => {
  return (
    <div className="notselecteduser">
      <Typography variant="h5">Click on the user to start chatting</Typography>
    </div>
  );
};
export default ChatBox;
