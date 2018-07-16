
//Action Types
import AccountApi from "../api/gala/AccountApi";
import Session from "./Session";

const LOGIN_REQUEST = "LOGIN_REQUEST",
      LOGIN_RESPONSE_OK = "LOGIN_RESPONSE_OK",
      LOGIN_RESPONSE_ERROR = "LOGIN_RESPONSE_ERROR";

//Reducer
//Initial state of loginState
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  success: false
};

export function loginReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, { fetching: true, error: false });
    case LOGIN_RESPONSE_OK:
      Session.setSession(action.token);
      return Object.assign({}, state, { fetching: false, error: false, success: true });
    case LOGIN_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true, errorMessage: action.message, success: false });
    default:
      return state;
  }
}

//Action Creators
export function login(email, password) {
  return function(dispatch) {
    dispatch(loginBegun());

    AccountApi.login(email, password)
      .then(response => {
        dispatch(loginSuccessful(response.data));
      })
      .catch(error => {
        dispatch(loginError("Login was unsuccessful."));
      })
  }
}

export function loginBegun() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccessful(token) {
  return {
    type: LOGIN_RESPONSE_OK,
    token: token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_RESPONSE_ERROR,
    message: message
  }
}