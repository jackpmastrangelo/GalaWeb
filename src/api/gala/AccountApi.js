import { galaAxios } from "./GalaApi";

export default class AccountApi {

  static createAccount(email, firstName, lastName, password) {
    return galaAxios.post("/accounts", {
      params: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
      }
    });
  }
}