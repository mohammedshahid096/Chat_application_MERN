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
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { SearchUserAction } from "../../../Actions/UserAction";
import { ToastError } from "../../AlertPops/Alertpop";
import {
  ChatClearErrorAction,
  FetchAllChatsAction,
  UpdateGroupNameAction,
} from "../../../Actions/ChatAction";
import {
  SELECTED_CHAT_USER_RESET,
  UPDATE_GROUP_NAME_RESET,
} from "../../../Constants/Chat.constant";

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

const GroupUpdateModel = (props) => {
  const { OpenGroupMode, CloseGroupModal, setOpenGroupMode } = props;
  const dispatch = useDispatch();
  const { loading: SearchLoading, results } = useSelector(
    (state) => state.SearchUser
  );
  const {
    loading: Grouploading,
    success,
    error,
  } = useSelector((state) => state.GroupOperation);
  const { selectedUser } = useSelector((state) => state.SelectedUser);

  //   todo : for searching the user related
  const [searchUser, setsearchUser] = useState("");
  const [GroupName, setGroupName] = useState("");
  const SearchChangleHandlerSubmit = (e) => {
    setsearchUser(e.target.value);
    if (e.target.value.length > 1) {
      dispatch(SearchUserAction(e.target.value));
    }
  };

  const DeleteFromGroupFun = () => {
    console.log("okkk");
  };

  const UpdateGroupHandler = () => {
    if (GroupName.length === 0) {
      ToastError("Enter the group name");
      return;
    }
    let x = selectedUser._id;
    dispatch(UpdateGroupNameAction(x, GroupName));
  };

  useEffect(() => {
    if (success) {
      setOpenGroupMode(false);
      dispatch(FetchAllChatsAction());
      dispatch({ type: SELECTED_CHAT_USER_RESET });
      dispatch({ type: UPDATE_GROUP_NAME_RESET });
    }
    if (error) {
      ToastError(error);
      dispatch(ChatClearErrorAction());
    }
  }, [dispatch, success, error, setOpenGroupMode]);

  return (
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
            <Typography id="transition-modal-title" variant="h6" component="h1">
              Update Group
            </Typography>

            <CloseIcon onClick={CloseGroupModal} />
          </Box>

          <Box sx={{ mt: 1, ...style[1] }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Group Name"
              value={GroupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <Button
              variant="contained"
              color="warning"
              onClick={UpdateGroupHandler}
            >
              Update
            </Button>
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {selectedUser &&
              selectedUser.users.map((item) => (
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

          {SearchLoading ? (
            <Box style={style[2]}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            results &&
            results.map((item) => (
              <Box
                sx={{ pt: 0.1 }}
                key={item._id}
                //   onClick={() => AdduserHanlderFun(item)}
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
                //   onClick={createGroupHandler}
              >
                Update Group
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GroupUpdateModel;
