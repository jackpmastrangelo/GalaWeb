import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { eventsReducer } from "./eventsReducer";

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  eventState: eventsReducer
});

export const galaStore = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));


