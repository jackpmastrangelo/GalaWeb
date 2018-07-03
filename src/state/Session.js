import Cookies from 'universal-cookie';

export default class Session {
  static sessionExists() {
    const cookies = new Cookies();
    return !!cookies.get("gala-session");
  }

  static setSession() {
    const cookies = new Cookies();
    cookies.set("gala-session", "true");
  }
}