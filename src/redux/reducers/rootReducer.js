import { combineReducers } from 'redux';
import site from './siteReducer';
import coins from './coinsReducer';

const rootReducer = combineReducers({
  site,
  coins
});

export default rootReducer;
