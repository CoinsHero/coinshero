import * as Immutable from 'seamless-immutable';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({ coinsFront: [] });

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.FETCH_COINS_FRONT_SUCCESS:
    return state.merge({
      coinsFront: action.payload
        .filter((coin) => coin.mktcap && coin.mktcap !== 'NaN')
        .sort((a, b) => {
          if (a.mktcap > b.mktcap) {
            return -1;
          } else if (a.mktcap < b.mktcap) {
            return 1;
          }

          return 0;
        })
        .map((coin, index) => ValuePair.parse(coin, action.meta.locale, index + 1))}
    );
  default:
    return state;
  }
};

export default CoinsReducer;
