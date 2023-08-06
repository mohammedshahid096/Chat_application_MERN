import React, { useEffect, useState } from "react";
import "./SideDrawer.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";
import Profile from "./Profile";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchUserAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { SEARCH_USER_RESET } from "../../../Constants/User.constants";
import { ToastError } from "../../AlertPops/Alertpop";
import {
  ChatClearErrorAction,
  FetchAllChatsAction,
  SelectedUserChatAction,
} from "../../../Actions/ChatAction";
import CircularProgress from "@mui/material/CircularProgress";

const NavBar = () => {
  const [state, setState] = useState(false);
  const [QuerySearch, setQuerySearch] = useState("");

  const dispatch = useDispatch();
  const { loading, results, error } = useSelector((state) => state.SearchUser);
  const {
    loading: AdduserLoading,
    success,
    error: AdduserError,
  } = useSelector((state) => state.AddUser);

  const count = window.innerWidth < 600 ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6];

  const toggleDrawer = () => {
    setState(!state);
    if (state && results) {
      dispatch({ type: SEARCH_USER_RESET });
    }
  };

  const SubmitHanlder = () => {
    dispatch(SearchUserAction(QuerySearch));
  };

  const AddUserHandler = (userId) => {
    dispatch(SelectedUserChatAction(userId));
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
    if (AdduserError) {
      ToastError(AdduserError);
      dispatch(ChatClearErrorAction());
    }
    if (success) {
      setState(false);
      dispatch({ type: SEARCH_USER_RESET });
      dispatch(FetchAllChatsAction());
    }
  }, [dispatch, error, AdduserError, success]);
  return (
    <>
      <div className="sideDrawer">
        <div className="showSearchButton">
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => setState(true)}
          >
            Search User
          </Button>

          <span>
            <IconButton onClick={() => setState(true)}>
              {" "}
              <SearchIcon />
            </IconButton>
          </span>
        </div>

        <div>
          <Typography>Shahid Info Developer</Typography>
        </div>

        <div>
          <Profile />
        </div>
      </div>

      <div>
        <Drawer anchor="left" open={state} onClose={toggleDrawer}>
          <Box sx={{ width: window.innerWidth < 600 ? 300 : 300, p: 2 }}>
            <div className="searchPannel">
              <TextField
                size="small"
                id="outlined-basic"
                label="search"
                variant="outlined"
                onChange={(e) => setQuerySearch(e.target.value)}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={SubmitHanlder}
              >
                Go
              </Button>
            </div>

            {loading ? (
              <Box sx={{ width: "auto", pt: 2 }}>
                {count.map((item) => (
                  <div key={item}>
                    <Skeleton width={150} />
                    <Skeleton width={220} />
                    <Typography variant="h3">
                      {" "}
                      <Skeleton />
                    </Typography>
                  </div>
                ))}
              </Box>
            ) : (
              results &&
              results.map((item) => (
                <Box
                  sx={{ pt: 1 }}
                  onClick={() => AddUserHandler(item._id)}
                  key={item._id}
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

            {AdduserLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress color="secondary" />
              </Box>
            ) : null}
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default NavBar;
// @media screen and (max-width: 600px) {``}
