import * as Immutable from 'seamless-immutable';

import targetCurrencies, {DEFAULT_TARGET_CURRENCY} from '../../helpers/targetCurrencies';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';
import {NO_VALUE_DATA_SYMBOL, COIN_STATUSES} from '../../helpers/consts';
import * as coinsInfo from '../../assets/data/coinsInfo.json';

let missingImageUrls = [];
let missingOfficialUrls = [];
let missingStatuses = [];

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
    const coinsLength = action.payload.length;
    const unSortedCoins = [];
    const coins = [];
    let index;
    let rankIndex;

    for (index = 0, rankIndex = 0; index < coinsLength; index++) {
      const coin = action.payload[index];
      const keys = Object.keys(coin);
      const keysLength = keys.length;
      let currentValue;

      for (let fieldIndex = 0; fieldIndex < keysLength; fieldIndex++) {
        switch (coin[keys[fieldIndex]]) {
        case 'NaN':
          currentValue = NO_VALUE_DATA_SYMBOL;
          break;
        case '':
          currentValue = NO_VALUE_DATA_SYMBOL;
          break;
        default:
          currentValue = coin[keys[fieldIndex]];
          break;
        }

        coin[keys[fieldIndex]] = currentValue;
      }

      /**
       * ******************************************
       * Add additional data
       * ******************************************/
      const coinBaseInfo = state.coinsList[coin.short.toLowerCase()];
      const codeUpperCase = coin.short.toUpperCase();

      coin.imageUrl = coinBaseInfo && coinBaseInfo.imageUrl;
      coin.status = coinsInfo[codeUpperCase] && coinsInfo[codeUpperCase].status;
      coin.officialUrl = coinsInfo[codeUpperCase] && coinsInfo[codeUpperCase].officialUrl;

      if (!coin.imageUrl) {
        missingImageUrls && missingImageUrls.push(coin.short);
      }

      if (!coin.status) {
        missingStatuses && missingStatuses.push(coin.short);
      }

      if (!coin.officialUrl && coinsInfo && coinsInfo[codeUpperCase] &&
        coinsInfo[codeUpperCase].status !== COIN_STATUSES.INACTIVE) {
        missingOfficialUrls && missingOfficialUrls.push(coin.short);
      }

      /**
       * ******************************************
       * End adding additional data
       * ******************************************/

      const SORT_FIELD = 'mktcap';

      // Unsorted
      if (coin[SORT_FIELD] === NO_VALUE_DATA_SYMBOL) {
        unSortedCoins.push(coin);
      } else {
        const pair = ValuePair.parse(coin, action.meta.locale, rankIndex + 1, state.targetCurrency);
        coins.push(pair);
        rankIndex++;

        // If the current coins is also a possible target currency, update its USD rate
        if (targetCurrencies[codeUpperCase]) {
          targetCurrencies[codeUpperCase].factorFromUSD = 1 / pair.price;
        }
      }
    }

    for (index = 0, rankIndex = coins.length; index < unSortedCoins.length; index++, rankIndex++) {
      const pair = ValuePair.parse(unSortedCoins[index], action.meta.locale, rankIndex + 1, state.targetCurrency);
      coins.push(pair);

      // If the current coins is also a possible target currency, update its USD rate
      if (targetCurrencies[pair.baseCurrency.code]) {
        targetCurrencies[pair.baseCurrency.code].factorFromUSD = 1 / pair.price;
      }
    }

    /**
     * ******************************************
     * Report missing data
     * ******************************************/
    if (missingImageUrls && missingImageUrls.length > 0) {
      console.warn(`You're missing some !! imageUrls !! for some coins (${missingImageUrls.length}) :` + JSON.stringify(missingImageUrls));
    }

    if (missingStatuses && missingStatuses.length > 0) {
      console.warn(`You're missing some !! Statuses !! for some coins (${missingStatuses.length}) :` + JSON.stringify(missingStatuses));
    }

    if (missingOfficialUrls && missingOfficialUrls.length > 0) {
      console.warn(`You're missing some !! Official Urls !! for some coins (${missingOfficialUrls.length}) :` +
        JSON.stringify(missingOfficialUrls));
    }

    missingStatuses = undefined;
    missingOfficialUrls = undefined;
    missingImageUrls = undefined;

    /**
     * ******************************************
     * End reporting of missing data
     * ******************************************/

    return state.merge({
      isUpdatingData: false,
      coinsData: {
        valuePairs: coins,
        updateTimestamp: Date.now()
      },
      // If a target currency is set, update it just in case it's a coin currency and we just updated it
      targetCurrency: targetCurrencies[state.targetCurrency.code]
    });
  }
  case Actions.FETCH_COINS_DATA_FAILURE:
    return state.merge({
      isUpdatingData: false
    });
  case Actions.FETCH_COINS_LIST:
    return state.merge({
      isUpdatingCoinsList: true
    });
  case Actions.FETCH_COINS_LIST_SUCCESS:
    if (action.payload && action.payload.BaseImageUrl && action.payload.Data) {
      const baseImageUrl = action.payload.BaseImageUrl;
      const coinsKeys = Object.keys(action.payload.Data);
      const coinsLength = coinsKeys.length;
      const coinsList = {};
      let index;
      let imageRelativeUrl;

      for (index = 0; index < coinsLength; index++) {
        imageRelativeUrl = action.payload.Data[coinsKeys[index]].ImageUrl;
        coinsList[coinsKeys[index].toLowerCase()] = {
          imageUrl: imageRelativeUrl ? `${baseImageUrl}${imageRelativeUrl}` : undefined
        };
      }

      return state.merge({
        coinsList,
        isUpdatingCoinsList: false
      });
    } else {
      return state.merge({
        isUpdatingCoinsList: false
      });
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
      })
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
