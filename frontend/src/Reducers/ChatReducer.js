import {
  ADD_CHAT_TO_USER_FAIL,
  ADD_CHAT_TO_USER_REQUEST,
  ADD_CHAT_TO_USER_SUCCESS,
  CHAT_CLEAR_ERROR,
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_RESET,
  CREATE_GROUP_CHAT_SUCCESS,
  DELETE_USER_FROM_GROUP_FAIL,
  DELETE_USER_FROM_GROUP_RESET,
  DELETE_USER_FROM_GROUP_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  SELECTED_CHAT_USER,
  SELECTED_CHAT_USER_RESET,
  UPDATE_GROUP_NAME_FAIL,
  UPDATE_GROUP_NAME_REQUEST,
  UPDATE_GROUP_NAME_RESET,
  UPDATE_GROUP_NAME_SUCCESS,
} from "../Constants/Chat.constant";

export const FetchAllChatRedcer = (state = { allChaters: [] }, action) => {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return {
        loading: true,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        allChaters: action.payload,
      };
    case FETCH_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHAT_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AddUserChatReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHAT_TO_USER_REQUEST:
      return {
        loading: true,
      };
    case ADD_CHAT_TO_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ADD_CHAT_TO_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CHAT_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const GroupOperationsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_GROUP_CHAT_REQUEST:
    case UPDATE_GROUP_NAME_REQUEST:
      return {
        loading: true,
      };
    case CREATE_GROUP_CHAT_SUCCESS:
    case UPDATE_GROUP_NAME_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case DELETE_USER_FROM_GROUP_SUCCESS:
      return {
        ...state,
        isRemoved: action.payload,
      };
    case CREATE_GROUP_CHAT_FAIL:
    case UPDATE_GROUP_NAME_FAIL:
    case DELETE_USER_FROM_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_GROUP_CHAT_RESET:
    case UPDATE_GROUP_NAME_RESET:
      return {
        ...state,
        success: null,
      };
    case DELETE_USER_FROM_GROUP_RESET:
      return {
        ...state,
        isRemoved: null,
      };
    case CHAT_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const SelectedUserReducer = (state = { selectedUser: null }, action) => {
  switch (action.type) {
    case SELECTED_CHAT_USER:
      return {
        selectedUser: action.payload,
      };
    case SELECTED_CHAT_USER_RESET:
      return {
        selectedUser: null,
      };
    default:
      return state;
  }
};
