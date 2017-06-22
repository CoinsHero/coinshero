import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {connect} from 'react-redux';

import localStorageSettings from '../helpers/localStorageSettings';
import {setDarkThemeInStore} from '../redux/actions/bootstrapActions';
import NavigationHeader from './NavigationHeader';
import CoinsPage from './CoinsPage';
import Services from '../services/services';

const styleSheet = createStyleSheet('MarketApp', (theme) => ({
  'root': {
    direction: 'ltr',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  'root--rtl': {
    direction: 'rtl'
  },
  'root__container': {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 11,
    alignItems: 'center'
  }
}));

class MarketApp extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: ''
    };
  }

  _onThemeClick() {
    this.props.setDarkThemeInStore(!this.props.isDarkTheme);
    localStorageSettings.setItem(localStorageSettings.KEYS.isDarkTheme, !this.props.isDarkTheme);
  }

  _onSearchChange(searchQuery) {
    this.setState({searchQuery});
  }

  render() {
    const classes = this.props.classes;
    const cx = classnamesjss(classes,
      'root',
      {'root--rtl': this.props.locale.isRTL}
    );

    return (
      <div className={cx}>
        <NavigationHeader disableSearch={this.props.coinsData.length === 0} showSearch={true} onThemeClick={this._onThemeClick.bind(this)} onSearchChange={this._onSearchChange.bind(this)} locale={this.props.locale} />
        <div className={classes.root__container}>
          <CoinsPage dataManipulations={{searchQuery: this.state.searchQuery}} valuePairs={this.props.coinsData} />
        </div>
        <Services />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinsData: state.coins.coinsData,
  isDarkTheme: state.site.isDarkTheme
});

MarketApp.propTypes = {
  setDarkThemeInStore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  coinsData: PropTypes.array,
  isDarkTheme: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {setDarkThemeInStore})(withStyles(styleSheet)(MarketApp));
