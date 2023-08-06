import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_RESET,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../Constants/User.constants";

export const UserReducer = (state = { user: {}, token: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const SearchReducer = (state = { searchUsers: [] }, action) => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return {
        loading: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_USER_RESET:
      return {
        results: null,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
