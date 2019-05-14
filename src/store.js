import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import createRootReducer from './redux/reducers';
import logger from 'redux-logger';

const initialState = {};
const enhancers = [];
const middleware = [thunk, logger];

const composeEnhancers = compose(applyMiddleware(...middleware), ...enhancers );

const store = createStore(
  createRootReducer(),
  initialState,
  composeEnhancers
);

export default store;