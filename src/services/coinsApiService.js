import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsFront } from '../redux/actions/coinsApiActions';

class CoinsApiService extends React.Component {
  constructor() {
    super();

    this.fetchCoinsFrontInterval;
  }

  componentWillMount() {
    this.fetchCoinsFront();
    this.fetchCoinsFrontInterval = setInterval(() => this.fetchCoinsFront(), 6000);
  }

  fetchCoinsFront() {
    this.props.fetchCoinsFront();
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
  fetchCoinsFront: PropTypes.func.isRequired
};

export default connect(null, { fetchCoinsFront })(CoinsApiService);
