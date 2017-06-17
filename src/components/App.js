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
      {'App--rtl': this.props.locale.isRTL}
    );

    // //////// MOCK DATA //////////
    // TODO: Delete as part of https://github.com/kazazor/coinsmarket/issues/15
    const mockPairs = [];
    const USD = require('../models/currencies/USD').default;
    const ValuePair = require('../models/ValuePair').default;

    for (let index = 1; index < 100; index++) {
      let pair = {
        rank: index,
        name: index % 2 === 0 ? `Test name - ${index}` : `שם בעברית קצת - ${index} עם!`,
        marketCap: (Math.random() * 9000000000) + 1,
        price: Math.random() * 4000,
        availableSupply: Math.round((Math.random() * 900000000) + 1),
        volume24h: (Math.random() * 90000000) + 1,
        percentChange24h: (Math.random() * 80) - 40,
        targetCurrency: new USD()
      };

      mockPairs.push(ValuePair.parse(pair, this.props.locale));
    }

    // //////// MOCK DATA //////////

    return (
      <div className={cx}>
        <NavigationHeader locale={this.props.locale} />
        <div className='App__container'>
          <CoinsTable valuePairs={mockPairs} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

export default App;
