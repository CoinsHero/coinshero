import * as Immutable from 'seamless-immutable';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({locale: {}});

/**
 * MainReducer
 */
const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.SET_LOCALE:
    return state.merge({ locale: action.payload });
  default:
    return state;
  }
};

export default SiteReducer;
