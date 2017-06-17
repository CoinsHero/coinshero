import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import NavigationHeader from './NavigationHeader';
import CoinsTable from './CoinsTable';

import '../styles/components/_App.scss';

class App extends Component {
  render() {
    const cx = classnames(
      'App',
      {'App--rtl': this.props.isRTL}
    );

    ////////// MOCK DATA //////////
    // Delete as part of https://github.com/kazazor/coinsmarket/issues/15
    const mockPairs = [];
    const USD = require('../models/currencies/USD').default;

    for (let index = 1; index < 100; index++) {
      mockPairs.push({
        rank: index,
        name: index % 2 === 0 ? `Test name - ${index}` : `שם בעברית קצת - ${index} עם!`,
        marketCap: (Math.random() * 9000000000) + 1,
        price: Math.random() * 4000,
        availableSupply: Math.round((Math.random() * 900000000) + 1),
        volume24h: (Math.random() * 90000000) + 1,
        percentChange24h: (Math.random() * 80) - 40,
        targetCurrency: new USD()
      });
    }

    ////////// MOCK DATA //////////

    return (
      <div className={cx}>
        <NavigationHeader />
        <div className='App__container'>
          <CoinsTable valuePairs={mockPairs} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isRTL: PropTypes.bool
};

export default App;
