import EventApi from "../api/gala/EventApi";
import { fetchEvents } from "./fetchEventsState";
import { sessionCredentialsExpired } from './Session';

//Action Types
const CREATE_EVENT_API_REQUEST = "CREATE_EVENT_API_REQUEST",
      CREATE_EVENT_API_RESPONSE_OK = "CREATE_EVENT_API_RESPONSE_OK",
      CREATE_EVENT_API_RESPONSE_ERROR = "CREATE_EVENT_API_RESPONSE_ERROR",
      CREATE_EVENT_BEGIN_EDITING = "CREATE_EVENT_BEGIN_EDITING",
      CREATE_EVENT_STOP_EDITING = "CREATE_EVENT_STOP_EDITING";

//Initial state for createEventReducer
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  event: null,
  editing: false
};

//Reducer
export function createEventReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT_API_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case CREATE_EVENT_API_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, error: false, event: action.event, editing: false });
    case CREATE_EVENT_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true, errorMessage: action.message });
    case CREATE_EVENT_BEGIN_EDITING:
      return Object.assign({}, state, { editing: true });
    case CREATE_EVENT_STOP_EDITING:
      return Object.assign({}, state, { editing: false});
    default:
      return state;
  }
}

//Action Creators
export function createEvent(name, place, startTime, endTime, capacity, description) {
  return function(dispatch) {

    dispatch(createEventBegun());

    EventApi.createNewUserEvent(name, place, startTime, endTime, capacity, description)
      .then(response => {
        dispatch(createEventSuccess(response.data));
        //When we successfully create a new event we should rerun fetch events so that anywhere in the application that
        //Relies on knowing what events exist is updated.
        dispatch(fetchEvents());
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          dispatch(sessionCredentialsExpired());
        } else {
          dispatch(createEventError("There was an error creating your event"));
        }
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

export function beginEditingEvent() {
  return {
    type: CREATE_EVENT_BEGIN_EDITING
  }
}

export function stopEditingEvent() {
  return {
    type: CREATE_EVENT_STOP_EDITING
  }
}