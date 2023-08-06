import {
  FETCH_ALL_MESSAGES_FAIL,
  FETCH_ALL_MESSAGES_REQUEST,
  FETCH_ALL_MESSAGES_SUCCESS,
  FETCH_ALL_MESSAGES_REFRESH,
  MESSAGE_CLEAR_ERRORS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  RECEIVED_SOCKET_MESSAGE,
  SEND_MESSAGE_RESET,
} from "../Constants/Message.constant";

export const FetchMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_MESSAGES_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case FETCH_ALL_MESSAGES_REFRESH:
      return {
        ...state,
      };
    case FETCH_ALL_MESSAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MESSAGE_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RECEIVED_SOCKET_MESSAGE:
      const details = action.payload;
      if (details)
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      else return state;
    default:
      return state;
  }
};

export const SendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        loading: false,
        msend: action.payload,
      };
    case SEND_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SEND_MESSAGE_RESET:
      return {
        ...state,
        msend: null,
      };
    case MESSAGE_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
