import * as Immutable from 'seamless-immutable';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({ coinsList: {}, isUpdatingCoinsList: false, coinsData: [], isUpdatingData: false });

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.FETCH_COINS_DATA:
    return state.merge({
      isUpdatingData: true
    });
  case Actions.FETCH_COINS_DATA_SUCCESS:
    return state.merge({
      isUpdatingData: false,
      coinsData: action.payload
        .filter((coin) => coin.mktcap && coin.mktcap !== 'NaN')
        .map((coin, index) => {
          const coinBaseInfo = state.coinsList[coin.short.toLowerCase()];

          if (coinBaseInfo) {
            coin.imageUrl = coinBaseInfo.imageUrl;
          }

          return ValuePair.parse(coin, action.meta.locale, index + 1);
        })}
    );
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
