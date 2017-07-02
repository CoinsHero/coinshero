import * as Immutable from 'seamless-immutable';

import USD from '../../models/currencies/USD';
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
  targetCurrency: DEFAULT_TARGET_CURRENCY
});

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
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

      coin.imageUrl = coinBaseInfo && coinBaseInfo.imageUrl;
      coin.status = coinsInfo[coin.short.toUpperCase()] && coinsInfo[coin.short.toUpperCase()].status;
      coin.officialUrl = coinsInfo[coin.short.toUpperCase()] && coinsInfo[coin.short.toUpperCase()].officialUrl;

      if (!coin.imageUrl) {
        missingImageUrls && missingImageUrls.push(coin.short);
      }

      if (!coin.status) {
        missingStatuses && missingStatuses.push(coin.short);
      }

      if (!coin.officialUrl && coinsInfo[coin.short.toUpperCase()].status !== COIN_STATUSES.INACTIVE) {
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
        coins.push(ValuePair.parse(coin, action.meta.locale, rankIndex + 1, state.targetCurrency));
        rankIndex++;
      }
    }

    for (index = 0, rankIndex = coins.length; index < unSortedCoins.length; index++, rankIndex++) {
      coins.push(ValuePair.parse(unSortedCoins[index], action.meta.locale, rankIndex + 1, state.targetCurrency));
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
      }
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
  case Actions.SET_TARGET_CURRENCY_CODE:
    const targetCurrency = targetCurrencies[action.payload] || new USD();

    return stste.merge({
      targetCurrency
    });
  default:
    return state;
  }
};

export default CoinsReducer;
