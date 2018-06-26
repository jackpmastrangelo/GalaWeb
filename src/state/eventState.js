import EventApi from '../api/gala/EventApi';

//Action Types
const EVENT_API_REQUEST = "EVENT_API_REQUEST", //Waiting for server response
      EVENT_API_RESPONSE_OK = "EVENT_API_RESPONSE_OK", //Successful result
      EVENT_API_RESPONSE_ERROR = "EVENT_API_RESPONSE_ERROR"; //Some unexpected error

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

    case EVENT_API_RESPONSE_ERROR:
      return Object.assign({}, state, { fetching: false, error: true,
        errorMessage: "An error occurred while fetching your events."});

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

    setTimeout(() => {
      EventApi.retrieveUserEvents(accountId)
        .then(response => {
          //Success
          dispatch(fetchEventsSuccessful(response.data))
        })
        .catch(error => {
          //This means axios recieved an error response IE 404.
          if (error.response) {
            //We could use this space to differentiate between errors if need be.
            //Clearly all the if statements are overkill for the same response, but these are for demonstration.
            dispatch(fetchEventsError())
          }
          //This means the request was made successfully but no response ever returned IE timeout.
          else if (error.request) {
            dispatch(fetchEventsError())
          }
          //Well something real weird has happened
          else {
            dispatch(fetchEventsError())
          }
        })
    }, 2000)
    };
}

//Use this action when you've successfully received events
export function fetchEventsSuccessful(events) {
  return {
    type: EVENT_API_RESPONSE_OK,
    events: events
  }
}

//Use this action when a generic error has occurred fetching the events.
export function fetchEventsError() {
  return {
    type: EVENT_API_RESPONSE_ERROR
  }
}