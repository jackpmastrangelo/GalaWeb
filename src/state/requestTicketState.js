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
        dispatch(requestTicketError(interpretError(error.response)))
      })
  }
}

function interpretError(response) {
  switch (response.status) {
    case 409:
      return "Sorry! The capacity for this event has been reached";
    case 404:
      return "The event id you requested does not exist or may have been deleted.";
    default:
      return "Uh oh. Something went wrong. Please try again and let us know!";
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