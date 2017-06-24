import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsData } from '../redux/actions/coinsApiActions';
import config from 'config';

class CoinsApiService extends React.Component {
  constructor() {
    super();

    this.fetchCoinsDataInterval;
  }

  componentWillMount() {
    if (this.props.locale) {
      this.fetchCoinsData();
    }

    this.fetchCoinsDataInterval = setInterval(() => {
      // Only fetch the data if we're not in the middle of fetching it
      // This cold be due to low network connectivity or anything like that
      if (!this.props.isUpdatingData) {
        this.fetchCoinsData();
      }
    }, config.SERVICES.COINS_IO.COINS_DATA_API_INTERVAL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale && !this.props.locale) {
      this.fetchCoinsData();
    }
  }

  fetchCoinsData() {
    this.props.fetchCoinsData(this.props.locale);
  }

  componentWillUnmount() {
    clearInterval(this.fetchCoinsDataInterval);
  }

  render() {
    return (
      <div></div>
    );
  }
}

CoinsApiService.propTypes = {
  fetchCoinsData: PropTypes.func.isRequired,
  isUpdatingData: PropTypes.bool.isRequired,
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

const mapStateToProps = (state) => ({
  locale: state.site.locale,
  isUpdatingData: state.coins.isUpdatingData
});

export default connect(mapStateToProps, { fetchCoinsData })(CoinsApiService);
