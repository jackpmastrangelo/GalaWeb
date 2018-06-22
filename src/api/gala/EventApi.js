import { galaAxios } from "./GalaApi";

export default class EventApi {

  static retrieveUserEvents(accountId) {
    return galaAxios.get("/events/users", {
      params: { accountId: accountId }
    });
  }

  static createNewUserEvent(accountId, name, place, eventTime, capacity) {
    return galaAxios.post("/events/users", {
      params: {
        accountId: accountId,
        name: name,
        place: place,
        eventTime: eventTime,
        capacity: capacity
      }
    });
  }

  static retrieveEventById(eventId) {
    return galaAxios.get("/events/" + eventId, {});
  }
}