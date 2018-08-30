import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Session, sessionReducer } from './Session';
import { fetchEventsReducer } from "./apiState/fetchEventsState";
import { createAccountReducer } from "./apiState/createAccountState";
import { createEventReducer } from "./apiState/createEventsState";
import { loginReducer } from "./apiState/loginState";
import { fetchEventDetailsReducer } from "./apiState/fetchEventDetailsState";
import { requestTicketReducer } from "./apiState/requestTicketState";
import { planningReducer } from "./planning/planningState";

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
  sessionState: sessionReducer,
  planningState: planningReducer
});

const rootReducer = (state, action) => {
  if (action.type === GLOBAL_STATE_RESET) {
    Session.deleteSession();
    state = undefined;
  }

  return appReducer(state, action);
};

export const galaStore = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));


