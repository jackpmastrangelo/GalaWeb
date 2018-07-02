import { galaAxios } from "./GalaApi";

export default class EventApi {

  static retrieveUserEvents() {
    return galaAxios.get("/events/users", {
      validateStatus: (status) => {
        return status === 200
      }
    });
  }

  static createNewUserEvent(name, place, eventTime, capacity) {
    return galaAxios.post("/events/users", {}, {
      params: {
        name: name,
        place: place,
        eventTime: eventTime,
        capacity: capacity
      },
      auth: {
        username: "j@j.com",
        password: "password"
      }
    });
  }

  static retrieveEventById(eventId) {
    return galaAxios.get("/events/" + eventId, {});
  }
}