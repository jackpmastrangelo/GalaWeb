import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { fetchEventsReducer } from "./fetchEventsState";
import { createAccountReducer } from "./createAccountState";
import {createEventReducer} from "./createEventsState";

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  fetchEventsState: fetchEventsReducer,
  createAccountState: createAccountReducer,
  createEventState: createEventReducer
});

export const galaStore = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));


