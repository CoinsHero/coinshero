import * as Actions from '../ActionNames';
import * as coinsInfo from '../../assets/data/coinsInfo.json';
import {NO_VALUE_DATA_SYMBOL, COIN_STATUSES} from '../../helpers/consts';
import ValuePair from '../../models/ValuePair';
import targetCurrencies from '../../helpers/targetCurrencies';

let missingOfficialUrls = [];
let missingStatuses = [];

const updateTargetCurrenciesFromPair = (pair) => {
  // If the current coins is also a possible target currency, update its USD rate
  if (targetCurrencies[pair.baseCurrency.code]) {
    targetCurrencies[pair.baseCurrency.code].factorFromUSD = 1 / pair.price;
  }
};

self.onmessage = ({ data: action }) => {
  switch (action.type) {
  case Actions.FETCH_COINS_LIST_SUCCESS:
  {
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

      action.payload = {coinsList};
    }

    self.postMessage(action);
    break;
  }
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

      const codeUpperCase = coin.short.toUpperCase();

      coin.status = coinsInfo[codeUpperCase] && coinsInfo[codeUpperCase].status;
      coin.officialUrl = coinsInfo[codeUpperCase] && coinsInfo[codeUpperCase].officialUrl;

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
        const pair = ValuePair.parse(coin, action.meta.locale, rankIndex + 1, action.meta.targetCurrency);
        coins.push(pair);
        rankIndex++;

        updateTargetCurrenciesFromPair(pair);
      }
    }

    for (index = 0, rankIndex = coins.length; index < unSortedCoins.length; index++, rankIndex++) {
      const pair = ValuePair.parse(unSortedCoins[index], action.meta.locale, rankIndex + 1, action.meta.targetCurrency);
      coins.push(pair);

      updateTargetCurrenciesFromPair(pair);
    }

    /**
     * ******************************************
     * Report missing data
     * ******************************************/

    if (missingStatuses && missingStatuses.length > 0) {
      console.warn(`You're missing some !! Statuses !! for some coins (${missingStatuses.length}) :` + JSON.stringify(missingStatuses));
    }

    if (missingOfficialUrls && missingOfficialUrls.length > 0) {
      console.warn(`You're missing some !! Official Urls !! for some coins (${missingOfficialUrls.length}) :` +
          JSON.stringify(missingOfficialUrls));
    }

    missingStatuses = undefined;
    missingOfficialUrls = undefined;

    /**
     * ******************************************
     * End reporting of missing data
     * ******************************************/

    action.payload = {
      valuePairs: coins,
      updateTimestamp: Date.now(),
      targetCurrencies
    };

    self.postMessage(action);

    break;
  }
  default: {
    self.postMessage(action);

    break;
  }
  }
};
