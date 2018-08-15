import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Session, sessionReducer } from './Session';
import { fetchEventsReducer } from "./fetchEventsState";
import { createAccountReducer } from "./createAccountState";
import { createEventReducer } from "./createEventsState";
import { loginReducer } from "./loginState";
import { fetchEventDetailsReducer } from "./fetchEventDetailsState";
import { requestTicketReducer } from "./requestTicketState";

//This is a special action for global state reset, used upon user logout.
const GLOBAL_STATE_RESET = "GLOBAL_STATE_RESET";

export function globalStateReset() {
  return {
    type: GLOBAL_STATE_RESET
  }
}

const loggerMiddleware = createLogger();

const appReducer = combineReducers({
  fetchEventsState: fetchEventsReducer,
  createAccountState: createAccountReducer,
  createEventState: createEventReducer,
  loginState: loginReducer,
  fetchEventDetailsState: fetchEventDetailsReducer,
  requestTicketState: requestTicketReducer,
  sessionState: sessionReducer
});

const rootReducer = (state, action) => {
  if (action.type === GLOBAL_STATE_RESET) {
    Session.deleteSession();
    state = undefined;
  }

  return appReducer(state, action);
};

export const galaStore = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));


