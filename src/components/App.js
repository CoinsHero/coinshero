import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import NavigationHeader from './NavigationHeader';

import '../styles/components/_App.scss';

class App extends Component {
  render() {
    const cx = classnames(
      'App',
      {'App--rtl': this.props.isRTL}
    );

    return (
      <div className={cx}>
        <NavigationHeader />
        <div>
          helllloooooo
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isRTL: PropTypes.bool
};

export default App;
