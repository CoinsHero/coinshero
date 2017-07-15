import * as Immutable from 'seamless-immutable';

import targetCurrencies, {DEFAULT_TARGET_CURRENCY} from '../../helpers/targetCurrencies';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';

let missingImageUrls = [];

const initialState = Immutable.from({
  coinsList: {},
  isUpdatingCoinsList: false,
  coinsData: {
    updateTimestamp: undefined,
    valuePairs: []
  },
  isUpdatingData: false,
  targetCurrency: DEFAULT_TARGET_CURRENCY,
  isUpdatingRegularCurrencies: false,
  isRegularCurrenciesFetched: false
});

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.SET_TARGET_CURRENCY: {
    const targetCurrency = action.payload;
    let newValuePairs;

    // In case we need to update the existing data
    if (state.coinsData && targetCurrency.factorFromUSD) {
      newValuePairs = [];
      const coinsLength = state.coinsData.valuePairs.length;
      let index;

      for (index = 0; index < coinsLength; index++) {
        const valuePair = state.coinsData.valuePairs[index];
        newValuePairs.push(ValuePair.changeCurrency(valuePair, action.meta.locale, targetCurrency));
      }
    } else {
      newValuePairs = state.coinsData.valuePairs;
    }

    const coinsData = Object.assign({}, state.coinsData);
    coinsData.valuePairs = newValuePairs;

    return state.merge({
      targetCurrency,
      coinsData
    });
  }
  case Actions.FETCH_COINS_DATA:
    return state.merge({
      isUpdatingData: true
    });
  case Actions.FETCH_COINS_DATA_SUCCESS: {
    // If the worker's job was done
    if (!action.meta.WebWorker) {
      let index;
      const coinsLength = action.payload.valuePairs.length;

      // Adding all the images to the currencies
      // We're doing it here and not int he worker in order not to pass too much information to it +
      // the fact that these are 2 separate API calls which means we'll need to wait for the coins list API
      // before we could start the coins data if it will be int he worker
      for (index = 0; index < coinsLength; index++) {
        const currency = action.payload.valuePairs[index].baseCurrency;
        const coinBaseInfo = state.coinsList[currency.code.toLowerCase()];

        currency.imageUrl = coinBaseInfo && coinBaseInfo.imageUrl;

        if (!currency.imageUrl) {
          missingImageUrls && missingImageUrls.push(currency.code);
        }
      }

      /**
       * ******************************************
       * Report missing data
       * ******************************************/
      if (missingImageUrls && missingImageUrls.length > 0) {
        console.warn(`You're missing some !! imageUrls !! for some coins (${missingImageUrls.length}):` + JSON.stringify(missingImageUrls));
      }

      missingImageUrls = undefined;

      return state.merge({
        isUpdatingData: false,
        coinsData: {
          valuePairs: action.payload.valuePairs,
          updateTimestamp: action.payload.updateTimestamp
        },
        // If a target currency is set, update it just in case it's a coin currency and we just updated it
        targetCurrency: targetCurrencies[state.targetCurrency.code]
      });
    } else {
      return state;
    }
  }
  case Actions.FETCH_COINS_DATA_FAILURE:
    return state.merge({
      isUpdatingData: false
    });
  case Actions.FETCH_COINS_LIST:
    return state.merge({
      isUpdatingCoinsList: true
    });
  case Actions.FETCH_COINS_LIST_SUCCESS: {
    // If the worker's job was done
    if (!action.meta.WebWorker) {
      return state.merge({
        coinsList: action.payload.coinsList,
        isUpdatingCoinsList: false
      });
    } else {
      return state;
    }
  }
  case Actions.FETCH_COINS_LIST_FAILURE:
    return state.merge({
      isUpdatingCoinsList: false
    });
  case Actions.FETCH_REGULAR_CURRENCIES:
    return state.merge({
      isUpdatingRegularCurrencies: true
    });
  case Actions.FETCH_REGULAR_CURRENCIES_SUCCESS: {
    const rateCodes = Object.keys(action.payload.rates);

    // Update the rates
    for (let index = 0; index < rateCodes.length; index++) {
      if (targetCurrencies[rateCodes[index]]) {
        targetCurrencies[rateCodes[index]].factorFromUSD = action.payload.rates[rateCodes[index]];
      }
    }

    return state.merge({
      // If a target currency is set, update it just in case it's a regular currency and we just updated it
      targetCurrency: targetCurrencies[state.targetCurrency.code],
      isUpdatingRegularCurrencies: false,
      isRegularCurrenciesFetched: true
    });
  }
  case Actions.FETCH_REGULAR_CURRENCIES_FAILURE:
    return state.merge({
      isUpdatingRegularCurrencies: false
    });
  default:
    return state;
  }
};

export default CoinsReducer;
