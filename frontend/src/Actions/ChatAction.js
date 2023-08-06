import {
  ADD_CHAT_TO_USER_FAIL,
  ADD_CHAT_TO_USER_REQUEST,
  ADD_CHAT_TO_USER_SUCCESS,
  CHAT_CLEAR_ERROR,
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  DELETE_USER_FROM_GROUP_FAIL,
  DELETE_USER_FROM_GROUP_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  SELECTED_CHAT_USER,
  UPDATE_GROUP_NAME_FAIL,
  UPDATE_GROUP_NAME_REQUEST,
  UPDATE_GROUP_NAME_SUCCESS,
} from "../Constants/Chat.constant";
import URLConstant from "../Constants/URL.constant";
import axios from "axios";

export const SelectedUserChatAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CHAT_TO_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/chat`,
      { userId },
      config
    );

    dispatch({
      type: ADD_CHAT_TO_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHAT_TO_USER_FAIL,
      action: error.response.data.message,
    });
  }
};

export const FetchAllChatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CHAT_REQUEST });

    const { data } = await axios.get(`${URLConstant}/chat`);

    dispatch({
      type: FETCH_CHAT_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const CreateGroupChat = (name, users) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GROUP_CHAT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URLConstant}/chat/group`,
      { name, users },
      config
    );

    dispatch({
      type: CREATE_GROUP_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const SelectUserAction = (data) => async (dispatch) => {
  dispatch({
    type: SELECTED_CHAT_USER,
    payload: data,
  });
};

export const UpdateGroupNameAction = (chatId, chatName) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GROUP_NAME_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${URLConstant}/chat/group/rename`,
      { chatId, chatName },
      config
    );

    dispatch({
      type: UPDATE_GROUP_NAME_SUCCESS,
      payload: data.updatedChat,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_GROUP_NAME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const DeleteUserFromGroupAction =
  (chatId, chatName) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${URLConstant}/chat/group/removeuser`,
        { chatId, chatName },
        config
      );

      dispatch({
        type: DELETE_USER_FROM_GROUP_SUCCESS,
        payload: data.updatedChat,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FROM_GROUP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const ChatClearErrorAction = () => async (dispatch) => {
  dispatch({ type: CHAT_CLEAR_ERROR });
};
