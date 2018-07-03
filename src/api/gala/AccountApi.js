import { galaAxios } from "./GalaApi";

export default class AccountApi {

  static createAccount(firstName, lastName, email, password) {
    return galaAxios.post("/accounts", {}, {
      params: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      },
      withCredentials: false
    });
  }

  static login(email, password) {
    return galaAxios.post("/accounts/login", {}, {
      auth: {
        username: email,
        password: password
      }
    })
  }
}