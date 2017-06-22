import * as Immutable from 'seamless-immutable';
import ValuePair from '../../models/ValuePair';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({ coinsData: [] });

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.FETCH_COINS_FRONT_SUCCESS:
    return state.merge({
      coinsData: action.payload
        .filter((coin) => coin.mktcap && coin.mktcap !== 'NaN')
        .map((coin, index) => ValuePair.parse(coin, action.meta.locale, index + 1))}
    );
  default:
    return state;
  }
};

export default CoinsReducer;
