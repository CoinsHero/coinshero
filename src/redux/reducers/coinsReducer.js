import * as Immutable from 'seamless-immutable';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';
import {NO_VALUE_DATA_SYMBOL} from '../../helpers/consts';

const initialState = Immutable.from({
  coinsList: {},
  isUpdatingCoinsList: false,
  coinsData: {
    updateTimestamp: undefined,
    valuePairs: []
  },
  isUpdatingData: false
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

      const coinBaseInfo = state.coinsList[coin.short.toLowerCase()];

      if (coinBaseInfo) {
        coin.imageUrl = coinBaseInfo.imageUrl;
      }

      const SORT_FIELD = 'mktcap';

      // Unsorted
      if (coin[SORT_FIELD] === NO_VALUE_DATA_SYMBOL) {
        unSortedCoins.push(coin);
      } else {
        coins.push(ValuePair.parse(coin, action.meta.locale, rankIndex + 1));
        rankIndex++;
      }
    }

    for (index = 0, rankIndex = coins.length; index < unSortedCoins.length; index++, rankIndex++) {
      coins.push(ValuePair.parse(unSortedCoins[index], action.meta.locale, rankIndex + 1));
    }

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
  default:
    return state;
  }
};

export default CoinsReducer;
