import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Backdrop,
  Modal,
  Fade,
  Box,
  TextField,
  Card,
  CardHeader,
  Avatar,
  CircularProgress,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { SearchUserAction } from "../../../Actions/UserAction";
import { ToastError } from "../../AlertPops/Alertpop";
import {
  ChatClearErrorAction,
  CreateGroupChat,
  FetchAllChatsAction,
} from "../../../Actions/ChatAction";

const style = [
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: window.innerWidth < 600 ? "99%" : 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 7,
    p: 2,
  },
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 10,
  },
  {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    mt: 3,
  },
];

const GroupChat = () => {
  const dispatch = useDispatch();
  const { loading, results } = useSelector((state) => state.SearchUser);
  const {
    loading: Grouploading,
    success,
    error,
  } = useSelector((state) => state.GroupOperation);

  //   todo : this is for Group modal
  const [OpenGroupMode, setOpenGroupMode] = useState(false);
  const OpenGroupModal = () => setOpenGroupMode(true);
  const CloseGroupModal = () => setOpenGroupMode(false);

  //   todo : for searching the user related
  const [searchUser, setsearchUser] = useState("");
  const [GroupName, setGroupName] = useState("");
  const SearchChangleHandlerSubmit = (e) => {
    setsearchUser(e.target.value);
    if (e.target.value.length > 1) {
      dispatch(SearchUserAction(e.target.value));
    }
  };

  //   todo : adding the user in an array
  const [AddUserGroup, setAddUserGroup] = useState([]);
  const AdduserHanlderFun = (userToAdd) => {
    if (AddUserGroup.includes(userToAdd)) {
      ToastError(`${userToAdd.name} is already added`);
      return;
    }
    setAddUserGroup([...AddUserGroup, userToAdd]);
  };

  //   todo : deleting the users from group
  const DeleteFromGroupFun = (deletedId) => {
    setAddUserGroup(AddUserGroup.filter((item) => item._id !== deletedId));
  };

  //   todo : creating a group
  const createGroupHandler = () => {
    if (GroupName.length === 0) {
      ToastError("Group name should not be empty");
      return;
    }
    if (AddUserGroup.length < 1) {
      ToastError("Add at least one member in the group");
      return;
    }
    let x = JSON.stringify(AddUserGroup.map((item) => item._id));
    dispatch(CreateGroupChat(GroupName, x));
  };

  useEffect(() => {
    if (success) {
      setOpenGroupMode(false);
      dispatch(FetchAllChatsAction());
    }
    if (error) {
      ToastError(error);
      dispatch(ChatClearErrorAction());
    }
  }, [dispatch, success, error]);
  return (
    <>
      <div className="GroupHeader">
        <div>
          {" "}
          <Typography variant="h6">My Chats</Typography>
        </div>

        <div>
          <Button
            variant="contained"
            color="success"
            size="small"
            endIcon={<AddIcon />}
            onClick={OpenGroupModal}
          >
            New Group Chat
          </Button>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={OpenGroupMode}
        // onClose={CloseGroupModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={OpenGroupMode}>
          <Box sx={style[0]}>
            <Box sx={style[1]}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h1"
              >
                Create Group Chat
              </Typography>

              <CloseIcon onClick={CloseGroupModal} />
            </Box>

            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Box>

            <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
              {AddUserGroup.map((item) => (
                <Chip
                  key={item._id}
                  color="secondary"
                  avatar={<Avatar src={item.profile.url} />}
                  label={item.name}
                  onDelete={() => DeleteFromGroupFun(item._id)}
                />
              ))}
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Add Users e.g. shahid, sohail,.."
                onChange={SearchChangleHandlerSubmit}
                value={searchUser}
              />
            </Box>

            {loading ? (
              <Box style={style[2]}>
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              results &&
              results.map((item) => (
                <Box
                  sx={{ pt: 0.1 }}
                  key={item._id}
                  onClick={() => AdduserHanlderFun(item)}
                >
                  <Card className="userHover">
                    <CardHeader
                      avatar={
                        <Avatar src={item.profile.url} aria-label="recipe" />
                      }
                      title={item.name}
                      subheader={item.email}
                    />
                  </Card>
                </Box>
              ))
            )}

            <Box sx={style[3]}>
              {Grouploading ? (
                <CircularProgress color="success" />
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={createGroupHandler}
                >
                  Create Group
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default GroupChat;
