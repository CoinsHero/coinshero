import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getSiteTheme from '../helpers/getSiteTheme';
import {setLocaleInStore} from '../redux/actions/bootstrapActions';

import {setLanguage, getLanguage, languages} from '../i18n';
import App from './App';

import '../styles/components/_Site.scss';

class Site extends Component {
  constructor(props) {
    super(props);

    // TODO: Take that from the URL / where ever is needed to handle it + LTR/RTL - https://github.com/kazazor/coinsmarket/issues/8
    // Setting the locale of the user
    const language = setLanguage(languages.he.code);
    props.setLocaleInStore(language);

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
  setLocaleInStore: PropTypes.func.isRequired
};

export default connect(null, { setLocaleInStore })(Site);
