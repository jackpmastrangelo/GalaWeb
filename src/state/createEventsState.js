
//Action Types
import EventApi from "../api/gala/EventApi";

const CREATE_EVENT_API_REQUEST = "CREATE_EVENT_API_REQUEST",
      CREATE_EVENT_API_RESPONSE_OK = "CREATE_EVENT_API_RESPONSE_OK",
      CREATE_EVENT_API_RESPONSE_ERROR = "CREATE_EVENT_API_RESPONSE_ERROR";

//Initial state for createEventReducer
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  event: null
}

//Reducer
export function createEventReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT_API_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case CREATE_EVENT_API_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, error: false, event: action.event });
    case CREATE_EVENT_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true, errorMessage: action.message });
    default:
      return state;
  }
}

//Action Creators
export function createEvent(name, place, eventTime, capacity) {
  return function(dispatch) {

    dispatch(createEventBegun());

    EventApi.createNewUserEvent(name, place, eventTime, capacity)
      .then(response => {
        dispatch(createEventSuccess(response.data))
      })
      .catch(error => {
        dispatch(createEventError("There was an error creating your event"))
      })
  }
}

export function createEventBegun() {
  return {
    type: CREATE_EVENT_API_REQUEST
  }
}

export function createEventSuccess(event) {
  return {
    type: CREATE_EVENT_API_RESPONSE_OK,
    event: event
  }
}

export function createEventError(message) {
  return {
    type: CREATE_EVENT_API_RESPONSE_ERROR,
    message: message
  }
}