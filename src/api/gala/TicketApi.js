import { galaAxios } from "./GalaApi";

export default class TicketApi {

  requestTicket(eventId, email) {
    return galaAxios.post("/tickets", {
      params: {
        eventId: eventId,
        email: email
      }
    });
  }

  validateTicket(ticketId, eventId) {
    return galaAxios.put("/tickets/validate", {
      params: {
        ticketId: ticketId,
        eventId: eventId
      }
    });
  }
}