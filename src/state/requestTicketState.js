import TicketApi from '../api/gala/TicketApi';

//Action types
const REQUEST_TICKET_API_REQUEST = "REQUEST_TICKET_API_REQUEST",
      REQUEST_TICKET_API_RESPONSE_OK = "REQUEST_TICKET_API_RESPONSE_OK",
      REQUEST_TICKET_API_RESPONSE_ERROR = "REQUEST_TICKET_API_RESPONSE_ERROR";

//Reducers
//Initial state for requestTicketReducer
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  success: false,
  ticket: null
};

export function requestTicketReducer(state=initialState, action) {
  switch (action.type) {
    case REQUEST_TICKET_API_REQUEST:
      return Object.assign({}, state, { fetching: true, error: false, success: false });
    case REQUEST_TICKET_API_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, error: false, success: true, ticket: action.ticket });
    case REQUEST_TICKET_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, success: false, error: true, errorMessage: action.message });
    default:
      return state;
  }
}

//Action creators
export function requestTicket(eventId, email) {
  return function (dispatch) {
    dispatch(requestTicketBegun());

    console.log("EID:" + eventId + "  EM:" + email);

    TicketApi.requestTicket(eventId, email)
      .then(response => {
        dispatch(requestTicketSuccess(response.data))
      })
      .catch(error => {
        dispatch(requestTicketError("Something went wrong requesting a ticket."))
      })
  }
}

export function requestTicketBegun() {
  return {
    type: REQUEST_TICKET_API_REQUEST
  }
}

export function requestTicketSuccess(ticket) {
  return {
    type: REQUEST_TICKET_API_RESPONSE_OK,
    ticket: ticket
  }
}

export function requestTicketError(message) {
  return {
    type: REQUEST_TICKET_API_RESPONSE_ERROR,
    message: message
  }
}