import EventApi from '../api/gala/EventApi';

//Action Types
const EVENT_API_REQUEST = "EVENT_API_REQUEST",
      EVENT_API_RESPONSE_OK = "EVENT_API_RESPONSE_OK",
      EVENT_API_RESPONSE_NO_CONTENT = "EVENT_API_RESPONSE_NO_CONTENT",
      EVENT_API_RESPONSE_NOT_FOUND = "EVENT_API_RESPONSE_NOT_FOUND",
      EVENT_API_RESPONSE_ERROR = "EVENT_API_RESPONSE_ERROR";

//Reducers
//State for eventsReducer
const initialState = {
  fetching: false,
  error: false,
  errorMessage: "",
  events: []
}

export function eventsReducer(state = initialState, action) {

  switch (action.type) {
    case EVENT_API_REQUEST:
      return Object.assign({}, state, { fetching: true });

    case EVENT_API_RESPONSE_OK:
      return Object.assign({}, state, { fetching: false, events: action.events});

    case EVENT_API_RESPONSE_NO_CONTENT:
      return Object.assign({}, state, { fetching: false, events: []});

    case EVENT_API_RESPONSE_NOT_FOUND:
      return Object.assign({}, state, { fetching: false, error: true, errorMessage: "The user could not be found."});

    case EVENT_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true,
        errorMessage: "An error occured while fetching your events."});

    default:
      return state;
  }
}

//Actions
//--------------------------------------

export function fetchEvents(accountId) {

  //Thunk middleware will automatically pass dispatch.
  return function (dispatch) {

    dispatch({type: EVENT_API_REQUEST});

    EventApi.retrieveUserEvents(accountId)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: EVENT_API_RESPONSE_OK, events: response.data})
        } else if (response.status === 204) {
          dispatch({type: EVENT_API_RESPONSE_NO_CONTENT})
        } else if (response.status === 404) {
          dispatch({type: EVENT_API_RESPONSE_NOT_FOUND})
        } else {
          dispatch({type: EVENT_API_RESPONSE_ERROR})
        }
      })
  }
}