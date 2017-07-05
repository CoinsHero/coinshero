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

export const fetchRegularCurrencies = (currenciesToFetch) => {
  const currencies = Object.values(currenciesToFetch).reduce((output, currency) => {
    return `${output}${currency.code},`;
  }, '');

  return ({
    [CALL_API]: {
      endpoint: `${config.ORIGINS.FIXER_IO}/latest?base=USD&symbols=${currencies}`,
      method: 'GET',
      types: [
        Actions.FETCH_REGULAR_CURRENCIES,
        {
          type: Actions.FETCH_REGULAR_CURRENCIES_SUCCESS
        },
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
