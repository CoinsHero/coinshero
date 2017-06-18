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
    this.fetchCoinsFrontInterval = setInterval(() => this.fetchCoinsFront(), config.CONSTS.COINS_API_INTERVAL);
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
  locale: PropTypes.shape({
    code: PropTypes.string,
    isRTL: PropTypes.bool
  })
};

const mapStateToProps = (state) => ({
  locale: state.site.locale
});

export default connect(mapStateToProps, { fetchCoinsFront })(CoinsApiService);
