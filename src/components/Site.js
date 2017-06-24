import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider } from 'material-ui/styles';

import localStorageSettings from '../helpers/localStorageSettings';
import getSiteTheme from '../helpers/getSiteTheme';
import {setLocaleInStore, setDarkThemeInStore} from '../redux/actions/bootstrapActions';
import {setLanguage, getUserDefaultLanguage} from '../i18n';

import MarketApp from './MarketApp';

import '../styles/components/_Site.scss';

class Site extends Component {
  _handleLocale(props) {
    let localeCode = localStorageSettings.getItem(localStorageSettings.KEYS.localeCode, undefined);

    if (!localeCode) {
      localeCode = getUserDefaultLanguage();
    }

    const locale = setLanguage(localeCode);
    props.setLocaleInStore(locale);
  }

  _handleTheme(props) {
    const isDarkTheme = localStorageSettings.getItem(localStorageSettings.KEYS.isDarkTheme, undefined);

    if (isDarkTheme !== undefined) {
      props.setDarkThemeInStore(isDarkTheme);
    }
  }

  constructor(props) {
    super(props);

    this._handleLocale(props);
    this._handleTheme(props);

    try {
      // Needed for onTouchTap
      // http://stackoverflow.com/a/34015469/988941
      injectTapEventPlugin();
    } catch (e) {
      // Leave empty on purpose
    }
  }

  render() {
    const isRTL = this.props.locale.isRTL;

    return (
      <MuiThemeProvider theme={getSiteTheme({isRTL, isDarkTheme: this.props.isDarkTheme})}>
        <MarketApp locale={this.props.locale}/>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.site.locale,
  isDarkTheme: state.site.isDarkTheme
});

Site.propTypes = {
  setLocaleInStore: PropTypes.func.isRequired,
  setDarkThemeInStore: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }).isRequired
};

export default connect(mapStateToProps, { setLocaleInStore, setDarkThemeInStore })(Site);
