import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import {connect} from 'react-redux';

import localStorageSettings from '../helpers/localStorageSettings';
import {setDarkThemeInStore} from '../redux/actions/bootstrapActions';
import NavigationHeader from './NavigationHeader';
import CoinsTable from './CoinsTable';
import Services from '../services/services';

const styleSheet = createStyleSheet('CoinsApp', (theme) => ({
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

class CoinsApp extends Component {
  _onThemeClick() {
    this.props.setDarkThemeInStore(!this.props.isDarkTheme);
    localStorageSettings.setItem(localStorageSettings.KEYS.isDarkTheme, !this.props.isDarkTheme);
  }

  render() {
    const classes = this.props.classes;
    const cx = classnamesjss(classes,
      'root',
      {'root--rtl': this.props.locale.isRTL}
    );

    // TODO: Send something to the search function & filter the table

    return (
      <div className={cx}>
        <NavigationHeader onThemeClick={this._onThemeClick.bind(this)} locale={this.props.locale} />
        <div className={classes.root__container}>
          <CoinsTable valuePairs={this.props.coinsData} />
        </div>
        <Services />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinsData: state.coins.coinsFront,
  isDarkTheme: state.site.isDarkTheme
});

CoinsApp.propTypes = {
  setDarkThemeInStore: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  coinsData: PropTypes.array,
  isDarkTheme: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {setDarkThemeInStore})(withStyles(styleSheet)(CoinsApp));
