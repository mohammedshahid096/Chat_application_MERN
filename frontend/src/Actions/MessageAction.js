import {
  FETCH_ALL_MESSAGES_FAIL,
  FETCH_ALL_MESSAGES_REQUEST,
  FETCH_ALL_MESSAGES_SUCCESS,
  MESSAGE_CLEAR_ERRORS,
  RECEIVED_SOCKET_MESSAGE,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
} from "../Constants/Message.constant";
import axios from "axios";
import URLConstant from "../Constants/URL.constant";
import { SendMessageSocket } from "./SocketConn";

export const FetchMessagesAction = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_MESSAGES_REQUEST });

    const { data } = await axios.get(`${URLConstant}/message/${chatId}`);

    dispatch({
      type: FETCH_ALL_MESSAGES_SUCCESS,
      payload: data.messages,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_MESSAGES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const SendMessageAction = (chatId, content) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URLConstant}/message`,
      { chatId, content },
      config
    );
    // console.log("----");

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: data.message,
    });
    SendMessageSocket(data.message);
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Recived socket message
export const RecivedSocketMessage = (data) => async (dispatch) => {
  dispatch({
    type: RECEIVED_SOCKET_MESSAGE,
    payload: data,
  });
};

// TODO : For clear all message the errors
export const MessageClearErrorsAction = () => async (dispatch) => {
  dispatch({ type: MESSAGE_CLEAR_ERRORS });
};
