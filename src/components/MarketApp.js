import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import withWidth from 'material-ui/utils/withWidth';
import grey from 'material-ui/colors/grey';

import {setWindowSize} from '../redux/actions/uiActions.js';
import localStorageSettings from '../helpers/localStorageSettings';
import {setDarkThemeInStore} from '../redux/actions/bootstrapActions';
import NavigationHeader from './NavigationHeader';
import CoinsPage from './CoinsPage';
import Services from '../services/services';
import Footer from './Footer';

const styleSheet = createStyleSheet((theme) => ({
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
  constructor(props) {
    super(props);

    props.setWindowSize(props.width);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width) {
      this.props.setWindowSize(nextProps.width);
    }
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
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  width: PropTypes.string.isRequired,
  coinsData: PropTypes.shape({
    valuePairs: PropTypes.arrayOf(PropTypes.object),
    updateTimestamp: PropTypes.number
  }),
  isDarkTheme: PropTypes.bool.isRequired,
  setWindowSize: PropTypes.func.isRequired,
  isRegularCurrenciesFetched: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {setDarkThemeInStore, setWindowSize})(compose(withStyles(styleSheet), withWidth())(MarketApp));
