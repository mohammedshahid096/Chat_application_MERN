import React, { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GroupUpdateModel from "./GroupUpdateModel";
import SingleMessage from "./SingleMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SELECTED_CHAT_USER_RESET } from "../../../Constants/Chat.constant";

const Message = () => {
  const { selectedUser } = useSelector((state) => state.SelectedUser);
  const dispatch = useDispatch();
  const loading = false;

  //   todo : this is for Group modal
  const [OpenGroupMode, setOpenGroupMode] = useState(false);
  const CloseGroupModal = () => setOpenGroupMode(false);

  const BackFunctionButton = () => {
    dispatch({ type: SELECTED_CHAT_USER_RESET });
  };
  useEffect(() => {}, [selectedUser]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="MessageBoxWrapper">
        <header>
          <span>
            <IconButton onClick={BackFunctionButton}>
              <ArrowBackIcon />
            </IconButton>
          </span>
          {!selectedUser.isGroupChat ? (
            <>
              <UserHeader Data={selectedUser} />
            </>
          ) : (
            <>
              <GroupHeader
                group={selectedUser}
                setOpenGroupMode={setOpenGroupMode}
              />
              <GroupUpdateModel
                CloseGroupModal={CloseGroupModal}
                OpenGroupMode={OpenGroupMode}
                setOpenGroupMode={setOpenGroupMode}
              />
            </>
          )}
        </header>

        <section>
          <SingleMessage />
        </section>
      </div>
    </>
  );
};

const UserHeader = ({ Data }) => {
  const { user } = useSelector((state) => state.User);
  const Details =
    Data.users[0]._id === user._id
      ? { name: Data.users[1].name, profile: Data.users[1].profile.url }
      : { name: Data.users[0].name, profile: Data.users[0].profile.url };

  const style = [
    {
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      color: "grey",
    },
  ];
  return (
    <Box sx={style[0]}>
      <Avatar src={Details.profile} />
      <Typography variant="h6">{Details.name}</Typography>
    </Box>
  );
};

const GroupHeader = ({ group, setOpenGroupMode }) => {
  return (
    <>
      <main>
        <Typography variant="h5">{group.chatName.toUpperCase()}</Typography>
        <IconButton onClick={() => setOpenGroupMode(true)}>
          <VisibilityIcon />
        </IconButton>
      </main>
    </>
  );
};

export default Message;
