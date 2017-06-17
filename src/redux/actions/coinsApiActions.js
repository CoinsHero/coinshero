import { CALL_API } from 'redux-api-middleware';
import * as Actions from '../ActionNames';

export const fetchCoinsFront = () => ({
  [CALL_API]: {
    endpoint: 'http://www.coincap.io/front',
    method: 'GET',
    types: [Actions.FETCH_COINS_FRONT, Actions.FETCH_COINS_FRONT_SUCCESS, Actions.FETCH_COINS_FRONT_FAILURE]
  }
});
