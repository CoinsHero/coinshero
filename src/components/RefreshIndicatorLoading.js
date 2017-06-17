import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import '../styles/components/_RefreshIndicatorLoading.scss';

class RefreshIndicatorLoading extends Component {
  render() {
    return (
      <div className="RefreshIndicatorLoading">
        <RefreshIndicator
          size={50}
          left={0}
          top={0}
          status="loading"
        />
      </div>
    );
  }
}

RefreshIndicatorLoading.propTypes = {
};

export default RefreshIndicatorLoading;
