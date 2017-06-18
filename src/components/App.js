import React, {Component} from 'react';
import classnamesjss from '../helpers/classnamesjss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import NavigationHeader from './NavigationHeader';
import CoinsTable from './CoinsTable';
import Services from '../services/services';

const styleSheet = createStyleSheet('App', (theme) => ({
  'root': {
    direction: 'ltr'
  },
  'root--rtl': {
    direction: 'rtl'
  },
  'root__container': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2.5,
    alignItems: 'center'
  }
}));

class App extends Component {
  render() {
    const classes = this.props.classes;
    const cx = classnamesjss(classes,
      'root',
      {'root--rtl': this.props.locale.isRTL}
    );

    // //////// MOCK DATA //////////
    // Delete as part of https://github.com/kazazor/coinsmarket/issues/15
    // const mockPairs = [];
    // const USD = require('../models/currencies/USD').default;
    //
    // for (let index = 1; index < 100; index++) {
    //   mockPairs.push({
    //     rank: index,
    //     name: index % 2 === 0 ? `Test name - ${index}` : `שם בעברית קצת - ${index} עם!`,
    //     marketCap: (Math.random() * 9000000000) + 1,
    //     price: Math.random() * 4000,
    //     availableSupply: Math.round((Math.random() * 900000000) + 1),
    //     volume24h: (Math.random() * 90000000) + 1,
    //     percentChange24h: (Math.random() * 80) - 40,
    //     targetCurrency: new USD()
    //   });
    // }

    // ///////// MOCK DATA //////////

    return (
      <div className={cx}>
        <NavigationHeader locale={this.props.locale} />
        <div className={classes['root__container']}>
          <CoinsTable valuePairs={this.props.coinsData} />
        </div>
        <Services />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  coinsData: PropTypes.array
};

const mapStateToProps = (state) => ({
  coinsData: state.coins.coinsFront
});

export default connect(mapStateToProps)(withStyles(styleSheet)(App));
