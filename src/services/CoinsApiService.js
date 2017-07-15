import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsData, fetchCoinsList, fetchRegularCurrencies } from '../redux/actions/coinsApiActions';
import {regularTargetCurrencies} from '../helpers/targetCurrencies';
import config from 'config';

class CoinsApiService extends React.Component {
  constructor(props) {
    super();

    this.fetchCoinsDataInterval;
    this.fetchCoinsListInterval;
    this.fetchRegularCurrenciesInterval;
  }

  componentWillMount() {
    // Coins Data

    if (this.props.targetCurrency.factorFromUSD) {
      this.fetchCoinsData();
    }

    this.fetchCoinsDataInterval = setInterval(() => {
      // Only fetch the data if we're not in the middle of fetching it
      // This could be due to low network connectivity or anything like that
      if (!this.props.isUpdatingData) {
        this.fetchCoinsData();
      }
    }, config.SERVICES.COINS_IO.COINS_DATA_API_INTERVAL);

    // Coins List

    this.props.fetchCoinsList();

    this.fetchCoinsListInterval = setInterval(() => {
      // Only fetch the data if we're not in the middle of fetching it
      // This could be due to low network connectivity or anything like that
      if (!this.props.isUpdatingCoinsList) {
        this.props.fetchCoinsList();
      }
    }, config.SERVICES.CRYPTO_COMPARE.COINS_LIST_API_INTERVAL);

    // Regular Currencies

    this.props.fetchRegularCurrencies(regularTargetCurrencies);

    this.fetchRegularCurrenciesInterval = setInterval(() => {
      // Only fetch the data if we're not in the middle of fetching it
      // This could be due to low network connectivity or anything like that
      if (!this.props.isUpdatingRegularCurrencies) {
        this.props.fetchRegularCurrencies(regularTargetCurrencies);
      }
    }, config.SERVICES.FIXER_IO.CURRENCIES_API_INTERVAL);
  }

  componentWillReceiveProps(nextProps) {
    // Get the data only if we already have the target currency rate, OR if we didn't have it and now we do
    if (nextProps.targetCurrency.factorFromUSD && !this.props.targetCurrency.factorFromUSD) {
      this.fetchCoinsData(nextProps.targetCurrency);
    }
  }

  fetchCoinsData(targetCurrency = this.props.targetCurrency, locale = this.props.locale) {
    this.props.fetchCoinsData(locale, targetCurrency);
  }

  componentWillUnmount() {
    clearInterval(this.fetchCoinsDataInterval);
    clearInterval(this.fetchCoinsListInterval);
    clearInterval(this.fetchRegularCurrenciesInterval);
  }

  render() {
    return (
      <div></div>
    );
  }
}

CoinsApiService.propTypes = {
  fetchCoinsData: PropTypes.func.isRequired,
  fetchCoinsList: PropTypes.func.isRequired,
  fetchRegularCurrencies: PropTypes.func.isRequired,
  isUpdatingData: PropTypes.bool.isRequired,
  isUpdatingCoinsList: PropTypes.bool.isRequired,
  isUpdatingRegularCurrencies: PropTypes.bool.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  }),
  targetCurrency: PropTypes.shape({
    factorFromUSD: PropTypes.number
  })
};

const mapStateToProps = (state) => ({
  locale: state.site.locale,
  targetCurrency: state.coins.targetCurrency,
  isUpdatingData: state.coins.isUpdatingData,
  isUpdatingCoinsList: state.coins.isUpdatingCoinsList,
  isUpdatingRegularCurrencies: state.coins.isUpdatingRegularCurrencies
});

export default connect(mapStateToProps, { fetchCoinsData, fetchCoinsList, fetchRegularCurrencies })(CoinsApiService);
