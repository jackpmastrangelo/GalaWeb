import EventApi from '../api/gala/EventApi';

const initialState = {
  fetching: false,
  events: []
}

export function eventsReducer(state = initialState, action) {

  switch (action.type) {
    case "EVENT_API_REQUEST":
      return Object.assign({}, state, { fetching: true });

    case "EVENT_API_RESPONSE":
      return Object.assign({}, state,{ fetching: false, events: action.events});

    default:
      return state;
  }
}

//This is an action, not a reducer
export function fetchEvents(accountId) {

  //Thunk middleware will automatically pass dispatch.
  return function (dispatch) {

    dispatch({type: "EVENT_API_REQUEST"});

    EventApi.retrieveUserEvents(accountId)
      .then(response => {
        console.log("Then");
        console.log(response);
        dispatch({type: "EVENT_API_RESPONSE", events: response.data})
      })
  }
}