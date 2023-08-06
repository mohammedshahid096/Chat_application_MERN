import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Loader/Loader";
import {
  FetchMessagesAction,
  RecivedSocketMessage,
  SendMessageAction,
} from "../../../Actions/MessageAction";
import {
  InitiateSocketConnection,
  JoinUserChatSocket,
} from "../../../Actions/SocketConn";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  SEND_MESSAGE_RESET,
  FETCH_ALL_MESSAGES_REFRESH,
} from "../../../Constants/Message.constant";
// import { ToastError } from "../../AlertPops/Alertpop";

// let socket, selectedChatCompare;

const SingleMessage = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.FetchMessages);
  const { selectedUser } = useSelector((state) => state.SelectedUser);
  const { user } = useSelector((state) => state.User);
  const { msend } = useSelector((state) => state.SendMessage);

  const [MessageState, setMessageState] = useState("");

  const sendMesssageHandler = (event) => {
    if (MessageState.length === 0) {
      return;
    }
    if (event.key === "Enter") {
      dispatch(SendMessageAction(selectedUser._id, MessageState));
      setMessageState("");
    }
  };
  useEffect(() => {
    InitiateSocketConnection(user);
  }, [user]);

  useEffect(() => {
    dispatch(FetchMessagesAction(selectedUser._id));
    JoinUserChatSocket(selectedUser._id);
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (msend) {
      dispatch(RecivedSocketMessage(msend));
      dispatch({ type: SEND_MESSAGE_RESET });
    }
    if (messages) {
      dispatch({ type: FETCH_ALL_MESSAGES_REFRESH });
    }
  }, [dispatch, msend, messages]);

  return (
    <div className="chatmessage_box">
      <div className="Message_wrapper">
        {loading ? (
          <Loader />
        ) : (
          <ScrollToBottom>
            {messages &&
              messages.map((item) => {
                let x =
                  item.sender._id === user._id
                    ? "chatoutgoing"
                    : "chatincomming";
                return (
                  <div className={x} key={item._id}>
                    <p>{item.content}</p>
                  </div>
                );
              })}
          </ScrollToBottom>
        )}
      </div>

      <div>
        <div className="sendOptions">
          <TextField
            placeholder="Enter a messagae.."
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            value={MessageState}
            onChange={(e) => setMessageState(e.target.value)}
            onKeyDown={sendMesssageHandler}
          />
          <div className="buttonDiv">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
