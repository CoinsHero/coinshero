import * as Immutable from 'seamless-immutable';

import * as Actions from '../ActionNames';

const initialState = Immutable.from({ coinsFront: [] });

/**
 * CoinsReducer
 */
const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.FETCH_COINS_FRONT_SUCCESS:
    return state.merge({ coinsFront: action.payload });
  default:
    return state;
  }
};

export default CoinsReducer;
