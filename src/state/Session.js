import Cookies from 'universal-cookie';

//This class is used to manage the session as a cookie in the User's Browser
export class Session {
  static sessionExists() {
    const cookies = new Cookies();
    return !!cookies.get("gala-session");
  }

  static setSession(token) {
    const cookies = new Cookies();
    cookies.set("gala-session", token);
  }

  static getSessionValue() {
    const cookies = new Cookies();
    return cookies.get("gala-session");
  }

  static deleteSession() {
    const cookies = new Cookies();
    return cookies.remove("gala-session");
  }
}

//This redux state is used to notify that the user's credentials have expired and that they need to login again.
const SESSION_CREDENTIALS_EXPIRED = "SESSION_CREDENTIALS_EXPIRED",
      SESSION_NEW_CREDENTIALS = "SESSION_NEW_CREDENTIALS";

const initState = {
  credentialsExpired: false
};

export function sessionReducer(state=initState, action) {
  switch (action.type) {
    case SESSION_CREDENTIALS_EXPIRED:
      Session.deleteSession();
      return { credentialsExpired: true };
    case SESSION_NEW_CREDENTIALS:
      return { credentialsExpired: false };
    default:
      return state;
  }
}

export function sessionCredentialsExpired() {
  return {
    type: SESSION_CREDENTIALS_EXPIRED
  }
}

export function sessionNewCredentials() {
  return {
    type: SESSION_NEW_CREDENTIALS
  }
}