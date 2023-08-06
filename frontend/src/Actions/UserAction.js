import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  USER_CLEAR_ERRORS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../Constants/User.constants";
import URLConstant from "../Constants/URL.constant";
import axios from "axios";

// TODO : Register the User
export const RegisterUserAction = (Details) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/register`,
      Details,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Register the User
export const LoginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Load the User
export const LoadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${URLConstant}/user/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Logout Action
export const LogoutAction = () => async (dispatch) => {
  try {
    await axios.get(`${URLConstant}/user/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const SearchUserAction = (searchString) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USER_REQUEST });

    const { data } = await axios.get(
      `${URLConstant}/user?search=${searchString}`
    );

    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : For clear all User the errors
export const userClearErrorsAction = () => async (dispatch) => {
  dispatch({ type: USER_CLEAR_ERRORS });
};
