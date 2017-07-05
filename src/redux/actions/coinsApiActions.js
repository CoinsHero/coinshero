import { CALL_API } from 'redux-api-middleware';
import * as Actions from '../ActionNames';
import config from 'config';

export const fetchCoinsData = (locale) => ({
  [CALL_API]: {
    endpoint: `${config.ORIGINS.COINS_IO}/front`,
    method: 'GET',
    types: [
      Actions.FETCH_COINS_DATA,
      {
        type: Actions.FETCH_COINS_DATA_SUCCESS,
        meta: { locale }
      },
      Actions.FETCH_COINS_DATA_FAILURE
    ]
  }
});

export const fetchCoinsList = () => ({
  [CALL_API]: {
    endpoint: `${config.ORIGINS.CRYPTO_COMPARE}/api/data/coinlist/`,
    method: 'GET',
    types: [
      Actions.FETCH_COINS_LIST,
      {
        type: Actions.FETCH_COINS_LIST_SUCCESS
      },
      Actions.FETCH_COINS_LIST_FAILURE
    ]
  }
});

export const setTargetCurrencyInStore = (payload) => ({ type: Actions.SET_TARGET_CURRENCY, payload });
