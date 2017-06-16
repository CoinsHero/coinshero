import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getSiteTheme from '../helpers/getSiteTheme';

import {setLanguage, getLanguage, languages} from '../i18n';
import App from './App';

import '../styles/components/_Site.scss';

class Site extends Component {
  constructor() {
    super();

    // TODO: Take that from the URL / where ever is needed to handle it + LTR/RTL - https://github.com/kazazor/coinsmarket/issues/8
    // Setting the locale of the user
    setLanguage(languages.he.code);

    try {
      // Needed for onTouchTap
      // http://stackoverflow.com/a/34015469/988941
      injectTapEventPlugin();
    } catch (e) {
      // Leave empty on purpose
    }
  }

  render() {
    const isRTL = getLanguage().isRTL;
    return (
      <MuiThemeProvider muiTheme={getSiteTheme(isRTL)}>
        <App isRTL={isRTL}/>
      </MuiThemeProvider>
    );
  }
}

Site.propTypes = {

};

export default Site;
