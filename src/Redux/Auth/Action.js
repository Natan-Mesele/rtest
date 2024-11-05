// src/Redux/Auth/Action.js
import axios from "axios";
import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "./ActionType";
import { API_BASE_URL } from "../Config/api"; 

export const register = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt }); // Only dispatch register success
    console.log("Register success:", data);
    // Make sure there is no automatic login call here
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    console.error("Registration error:", errorMessage);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    console.log("Login success:", data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response ? error.response.data : "Unknown error" });
    console.log("Login error:", error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};

// Optionally, you can add getUser to fetch user info after login
export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.response ? error.response.data : "Unknown error" });
  }
};
