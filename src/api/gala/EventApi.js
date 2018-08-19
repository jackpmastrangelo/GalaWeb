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

  static createNewUserEvent(name, place, startTime, endTime, capacity, description) {
    return galaAxios.post("/events/users", {
      name: name,
      place: place,
      startTime: startTime,
      endTime: endTime,
      capacity: capacity,
      description: description
    }, {
      headers: {
        Authorization: ("Bearer " + Session.getSessionValue())
      }
    });
  }

  static retrieveEventById(eventId) {
    return galaAxios.get("/events/" + eventId, {});
  }
}