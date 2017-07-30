import * as Immutable from 'seamless-immutable';
import * as Actions from '../ActionNames';

const initialState = Immutable.from({locale: {}, isDarkTheme: false, windowSize: ''});

/**
 * MainReducer
 */
const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.SET_LOCALE:
    return state.merge({ locale: action.payload });
  case Actions.SET_DARK_THEME:
    return state.merge({ isDarkTheme: action.payload });
  case Actions.SET_WINDOW_SIZE:
    return state.merge({ windowSize: action.payload });
  default:
    return state;
  }
};

export default SiteReducer;
