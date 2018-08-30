import EventApi from '../../api/gala/EventApi';

//Action Types
const FETCH_EVENT_DETAILS_API_REQUEST = "FETCH_EVENT_DETAILS_API_REQUEST", //Waiting for server response
      FETCH_EVENT_DETAILS_API_RESPONSE_OK = "FETCH_EVENT_DETAILS_API_RESPONSE_OK", //Successful result
      FETCH_EVENT_DETAILS_API_RESPONSE_ERROR = "FETCH_EVENT_DETAILS_API_RESPONSE_ERROR"; //Some unexpected error

//Reducers
//State for fetchEventDetailsReducer
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  event: null
};

export function fetchEventDetailsReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_EVENT_DETAILS_API_REQUEST:
      return Object.assign({}, state, { fetching: true, error: false });
    case FETCH_EVENT_DETAILS_API_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, error: false, event: action.event });
    case FETCH_EVENT_DETAILS_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true, errorMessage: action.message });
    default:
      return state;
  }
}

//Action creators
export function fetchEventDetails(eventId) {
  return function(dispatch) {
    dispatch(fetchEventDetailsBegun());

    EventApi.retrieveEventById(eventId)
      .then(response => {
        dispatch(fetchEventDetailsSuccessful(response.data));
      })
      .catch(error => {
        fetchEventDetailsError("There was en error fetching the event.");
      })
  }
}

export function fetchEventDetailsBegun() {
  return {
    type: FETCH_EVENT_DETAILS_API_REQUEST
  }
}

export function fetchEventDetailsSuccessful(event) {
  return {
    type: FETCH_EVENT_DETAILS_API_RESPONSE_OK,
    event: event
  }
}

export function fetchEventDetailsError(message) {
  return {
    type: FETCH_EVENT_DETAILS_API_RESPONSE_ERROR,
    message: message
  }
}