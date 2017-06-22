import * as Immutable from 'seamless-immutable';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({ coinsFront: [], isUpdatingData: false });

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.FETCH_COINS_FRONT:
    return state.merge({
      isUpdatingData: true
    });
  case Actions.FETCH_COINS_FRONT_SUCCESS:
    return state.merge({
      isUpdatingData: false,
      coinsFront: action.payload
        .filter((coin) => coin.mktcap && coin.mktcap !== 'NaN')
        .map((coin, index) => ValuePair.parse(coin, action.meta.locale, index + 1))}
    );
  case Actions.FETCH_COINS_FRONT_FAILURE:
    return state.merge({
      isUpdatingData: false
    });
  default:
    return state;
  }
};

export default CoinsReducer;
