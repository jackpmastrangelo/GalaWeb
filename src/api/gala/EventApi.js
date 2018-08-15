import { galaAxios } from "./GalaApi";
import { Session } from "../../state/Session";

export default class EventApi {

  static retrieveUserEvents() {
    return galaAxios.get("/events/users", {
      validateStatus: (status) => {
        return status === 200
      },
      headers: {
        Authorization: ("Bearer " + Session.getSessionValue())
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
      headers: {
        Authorization: ("Bearer " + Session.getSessionValue())
      }
    });
  }

  static retrieveEventById(eventId) {
    return galaAxios.get("/events/" + eventId, {});
  }
}