import React, { useEffect } from "react";
import "./MyChat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllChatsAction,
  SelectUserAction,
} from "../../../Actions/ChatAction";
import { Box, CardHeader, Avatar } from "@mui/material";
import GroupChat from "./GroupChat";

const MyChat = () => {
  const dispatch = useDispatch();
  const { loading, allChaters } = useSelector((state) => state.FetchChats);
  const { user } = useSelector((state) => state.User);
  const { selectedUser } = useSelector((state) => state.SelectedUser);

  const SelectUserHandle = (userData) => {
    dispatch(SelectUserAction(userData));
    // alert(id);
  };

  useEffect(() => {
    dispatch(FetchAllChatsAction());
  }, [dispatch]);

  return (
    <div
      className={
        selectedUser
          ? " MyChatWrapper hideChatUsers"
          : "MyChatWrapper showChatUsers"
      }
    >
      <header>
        <GroupChat />
      </header>

      <div>
        {loading ? null : (
          <Box sx={{ p: 2, pt: 0 }}>
            {allChaters &&
              allChaters.map((item) => (
                <div
                  className={
                    selectedUser && selectedUser._id === item._id
                      ? "chatuserProfile selecteduser"
                      : "chatuserProfile"
                  }
                  key={item._id}
                  onClick={() => SelectUserHandle(item)}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={
                          item.isGroupChat
                            ? ""
                            : item.users[0]._id === user._id
                            ? item.users[1].profile.url
                            : item.users[0].profile.url
                        }
                        aria-label="recipe"
                      />
                    }
                    title={
                      item.isGroupChat
                        ? item.chatName
                        : item.users[0]._id === user._id
                        ? item.users[1].name
                        : item.users[0].name
                    }
                    subheader={"@gmail.com"}
                  />
                </div>
              ))}
          </Box>
        )}
      </div>
    </div>
  );
};

export default MyChat;
