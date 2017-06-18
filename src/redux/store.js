import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { apiMiddleware } from 'redux-api-middleware';

export default createStore(
  rootReducer,
  applyMiddleware(apiMiddleware)
);
