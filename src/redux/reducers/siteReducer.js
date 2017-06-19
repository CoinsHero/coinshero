import * as Immutable from 'seamless-immutable';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({locale: {}, isDarkTheme: true});

/**
 * MainReducer
 */
const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.SET_LOCALE:
    return state.merge({ locale: action.payload });
  case Actions.TOGGLE_THEME:
    return state.merge({ isDarkTheme: !state.isDarkTheme });
  default:
    return state;
  }
};

export default SiteReducer;
