import * as Immutable from 'seamless-immutable';
import * as Actions from '../ActionNames';
import {THEMES} from '../../helpers/consts';

const initialState = Immutable.from({locale: {}, theme: THEMES.dark});

/**
 * MainReducer
 */
const SiteReducer = (state = initialState, action) => {
  switch (action.type) {
  case Actions.SET_LOCALE:
    return state.merge({ locale: action.payload });
  case Actions.SET_THEME:
    return state.merge({ theme: THEMES[action.payload] ? THEMES[action.payload] : THEMES.dark });
  default:
    return state;
  }
};

export default SiteReducer;
