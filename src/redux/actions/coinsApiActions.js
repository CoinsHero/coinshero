import { CALL_API } from 'redux-api-middleware';
import * as Actions from '../ActionNames';
import config from 'config';

export const fetchCoinsData = (locale, targetCurrency) => ({
  [CALL_API]: {
    endpoint: `${config.ORIGINS.COINS_IO}/front`,
    method: 'GET',
    types: [
      Actions.FETCH_COINS_DATA,
      {
        type: Actions.FETCH_COINS_DATA_SUCCESS,
        meta: {
          locale,
          targetCurrency,
          WebWorker: true
        }
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
        type: Actions.FETCH_COINS_LIST_SUCCESS,
        meta: {
          WebWorker: true
        }
      },
      Actions.FETCH_COINS_LIST_FAILURE
    ]
  }
});

export const fetchRegularCurrencies = (currenciesToFetch) => {
  const currencies = Object.keys(currenciesToFetch).join(',');

  return ({
    [CALL_API]: {
      endpoint: `${config.ORIGINS.FIXER_IO}/latest?base=USD&symbols=${currencies}`,
      method: 'GET',
      types: [
        Actions.FETCH_REGULAR_CURRENCIES,
        Actions.FETCH_REGULAR_CURRENCIES_SUCCESS,
        Actions.FETCH_REGULAR_CURRENCIES_FAILURE
      ]
    }
  });
};

export const setTargetCurrencyInStore = (locale, payload) => ({
  type: Actions.SET_TARGET_CURRENCY,
  payload,
  meta: {locale}
});
