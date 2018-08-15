import { galaAxios } from "./GalaApi";
import { Session } from "../../state/Session";

export default class TicketApi {

  static requestTicket(eventId, email) {
    return galaAxios.post("/tickets", {}, {
      params: {
        eventId: eventId,
        email: email
      }});
  }

  static validateTicket(ticketId, eventId) {
    return galaAxios.put("/tickets/validate", {
      params: {
        ticketId: ticketId,
        eventId: eventId
      },
      headers: {
        Authorization: ("Bearer " + Session.getSessionValue())
      }
    });
  }
}