import Cookies from 'universal-cookie';

export default class Session {
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