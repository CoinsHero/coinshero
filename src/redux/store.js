import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers/rootReducer';
import worker from './middlewares/worker';
import { apiMiddleware } from 'redux-api-middleware';
import logger from './middlewares/logger';

const createNewStore = () => {
  const store = createStore(rootReducer, applyMiddleware(
    worker,
    apiMiddleware,
    logger
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/rootReducer', () => {
      const nextRootReducer = require('./reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default createNewStore();
