import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import grey from 'material-ui/colors/grey';

import localStorageSettings from '../helpers/localStorageSettings';
import {setDarkThemeInStore} from '../redux/actions/bootstrapActions';
import {setScrollTop} from '../redux/actions/utilActions.js';
import NavigationHeader from './NavigationHeader';
import CoinsPage from './CoinsPage';
import Services from '../services/services';
import Footer from './Footer';

const styleSheet = createStyleSheet('MarketApp', (theme) => ({
  root: {
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: grey[100],
    fontWeight: theme.typography.body1.fontWeight
  },
  'root--dark-theme': {
    backgroundColor: theme.palette.accent['A300']
  },
  'root--rtl': {
    direction: 'rtl'
  },
  root__legal: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    flexDirection: 'column',
    textAlign: 'center'
  },
  root__container: {
    display: 'flex',
    width: '95%',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 10,
    alignItems: 'center'
  }
}));

class MarketApp extends Component {
  constructor() {
    super();

    this.handleScroll = debounce(this.handleScroll.bind(this), 300);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    this.props.setScrollTop(event.target.scrollingElement.scrollTop);
  }

  _onThemeClick() {
    this.props.setDarkThemeInStore(!this.props.isDarkTheme);
    localStorageSettings.setItem(localStorageSettings.KEYS.isDarkTheme, !this.props.isDarkTheme);
  }


  render() {
    const classes = this.props.classes;
    const cx = classnamesjss(classes,
      'root',
      {
        'root--dark-theme': this.props.isDarkTheme,
        'root--rtl': this.props.locale.isRTL
      }
    );

    const showLoading = this.props.coinsData.valuePairs.length === 0 || !this.props.isRegularCurrenciesFetched;

    return (
      <div className={cx}>
        <NavigationHeader
          onThemeClick={this._onThemeClick.bind(this)}
          locale={this.props.locale} />
        <div className={classes.root__container}>
          <CoinsPage showLoading={showLoading} locale={this.props.locale} coinsData={this.props.coinsData}/>
        </div>
        <Footer />
        <Services />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinsData: state.coins.coinsData,
  isDarkTheme: state.site.isDarkTheme,
  isRegularCurrenciesFetched: state.coins.isRegularCurrenciesFetched
});

MarketApp.propTypes = {
  setDarkThemeInStore: PropTypes.func.isRequired,
  setScrollTop: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  coinsData: PropTypes.shape({
    valuePairs: PropTypes.arrayOf(PropTypes.object),
    updateTimestamp: PropTypes.number
  }),
  isDarkTheme: PropTypes.bool.isRequired,
  isRegularCurrenciesFetched: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {setDarkThemeInStore, setScrollTop})(withStyles(styleSheet)(MarketApp));
