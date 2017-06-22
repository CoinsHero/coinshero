import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsFront } from '../redux/actions/coinsApiActions';
import config from 'config';

class CoinsApiService extends React.Component {
  constructor() {
    super();

    this.fetchCoinsFrontInterval;
  }

  componentWillMount() {
    if (this.props.locale) {
      this.fetchCoinsFront();
    }
    this.fetchCoinsFrontInterval = setInterval(() => {
      // Only fetch the data if we're not in the middle of fetching it
      // This cold be due to low network connectivity or anything like that
      if (!this.props.isUpdatingData) {
        // Takes care of situations where the user got offline and this function throws an Error
        try {
          this.fetchCoinsFront();
        } catch (e) {
          console.warn(e);
        }
      }
    }, config.CONSTS.COINS_API_INTERVAL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale && !this.props.locale) {
      this.fetchCoinsFront();
    }
  }

  fetchCoinsFront() {
    this.props.fetchCoinsFront(this.props.locale);
  }

  componentWillUnmount() {
    clearInterval(this.fetchCoinsFrontInterval);
  }

  render() {
    return (
      <div></div>
    );
  }
}

CoinsApiService.propTypes = {
  fetchCoinsFront: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { fetchCoinsFront })(CoinsApiService);
