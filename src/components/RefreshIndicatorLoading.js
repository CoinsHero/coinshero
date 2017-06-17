import React from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import '../styles/components/_RefreshIndicatorLoading.scss';

const RefreshIndicatorLoading = (props) => {
  return (
    <div className="RefreshIndicatorLoading">
      <RefreshIndicator
        size={props.size}
        left={0}
        top={0}
        status='loading'
        style={{position: 'relative'}}
      />
    </div>
  );
};

RefreshIndicatorLoading.propTypes = {
  size: PropTypes.number
};

RefreshIndicatorLoading.defaultProps = {
  size: 50
};

export default RefreshIndicatorLoading;
