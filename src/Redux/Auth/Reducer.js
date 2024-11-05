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

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jwt: action.payload.jwt,
          success: "Registration successful!",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Operation successful",
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

      case LOGOUT:
        localStorage.removeItem("jwt"); // Clear JWT from localStorage on logout
        return {
          ...state,
          user: null,
          jwt: null,
        };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

    default:
      return state;
  }
};
